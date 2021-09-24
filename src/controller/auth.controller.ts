import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import httpStatus from '../constant/status.constant'
import UserModel from '../model/user.model'

interface UserPost {
  email: string
  username: string
  password: string
}

export const register = async (req: Request, res: Response) => {
  const { email, username, password }: UserPost = req.body

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
    await newUser.save()
  } catch (err) {
    // if user value is not valid then respond status BAD REQUEST with err
    return res.status(httpStatus.BAD_REQUEST).send(err)
  }

  // generate access token
  const payload = { email, username }
  const token = jwt.sign(payload, config.jwtPrivateKey, {
    expiresIn: config.refreshTokenTtl,
  })
  // respond CREATE status with access token
  return res.status(httpStatus.CREATED).json({ token })
}
