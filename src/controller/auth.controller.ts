import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import httpStatus from '../constant/status.constant'
import UserModel from '../model/user.model'

interface UserPostLogin {
  email: string
  password: string
}
interface UserPostRegister extends UserPostLogin {
  username: string
}

export const login = async (req: Request, res: Response) => {
  const { email, password }: UserPostLogin = req.body

  const user = await UserModel.findOne({ email })
  // check if user does not exist then respond BAD REQUEST status
  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send('user does not exist')
  }

  // compare password with hash if different then respond BAD REQUEST status
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(httpStatus.BAD_REQUEST).send('password is incorrect')
  }

  // generate access token
  const payload = { _id: user._id }
  const token = jwt.sign(payload, config.jwtPrivateKey, {
    expiresIn: config.refreshTokenTtl,
  })

  // respond OK status with access token
  return res.status(httpStatus.OK).json({ token })
}

export const register = async (req: Request, res: Response) => {
  const { email, username, password }: UserPostRegister = req.body

  const existingUser = await UserModel.findOne({ email })
  // check if user exists then respond BAD REQUEST status
  if (existingUser) {
    return res.status(httpStatus.BAD_REQUEST).send('email has been taken')
  }

  //use bcrypt to generate hashed password
  const salt = await bcrypt.genSalt(config.saltWorkFactor)
  const hash = await bcrypt.hash(password, salt)

  const newUser = new UserModel({
    email,
    username,
    password: hash,
  })

  try {
    // insert new user document to database
    const savedUser = await newUser.save()

    // generate access token
    const payload = { _id: savedUser._id }
    const token = jwt.sign(payload, config.jwtPrivateKey, {
      expiresIn: config.refreshTokenTtl,
    })

    // respond CREATE status with access token
    return res.status(httpStatus.CREATED).json({ token })
  } catch (err) {
    // if user value is not valid then respond status BAD REQUEST with err
    return res.status(httpStatus.BAD_REQUEST).send(err)
  }
}
