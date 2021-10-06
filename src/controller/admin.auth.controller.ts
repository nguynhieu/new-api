import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import httpStatus from '../constant/status.constant'
import AdminModel from '../model/admin.model'

interface Admin {
  username: string
  password: string
}

export const login = async (req: Request, res: Response) => {
  const { username, password }: Admin = req.body

  const admin = await AdminModel.findOne({ username })
  // check if admin does not exist then respond BAD REQUEST status
  if (!admin) {
    return res.status(httpStatus.BAD_REQUEST).send('user does not exist')
  }

  // compare password with hash if different then respond BAD REQUEST status
  const validPassword = await bcrypt.compare(password, admin.password)
  if (!validPassword) {
    return res.status(httpStatus.BAD_REQUEST).send('password is incorrect')
  }

  // generate access token
  const payload = { _id: admin._id }
  const token = jwt.sign(payload, config.jwtPrivateKey, {
    expiresIn: config.refreshTokenTtl,
  })
  // respond OK status with access token
  return res.status(httpStatus.OK).json({ token })
}

export const register = async (req: Request, res: Response) => {
  const { username, password }: Admin = req.body

  const existingUser = await AdminModel.findOne({ username })
  // check if user exists then respond BAD REQUEST status
  if (existingUser) {
    return res.status(httpStatus.BAD_REQUEST).send('Username has been taken')
  }

  //use bcrypt to generate hashed password
  const salt = await bcrypt.genSalt(config.saltWorkFactor)
  const hash = await bcrypt.hash(password, salt)

  const newAccount = new AdminModel({
    username,
    password: hash,
  })

  try {
    // insert new user document to database
    await newAccount.save()

    // respond CREATE status with access token
    return res.status(httpStatus.CREATED).json('Created successfuly')
  } catch (err) {
    // if user value is not valid then respond status BAD REQUEST with err
    return res.status(httpStatus.BAD_REQUEST).send(err)
  }
}
