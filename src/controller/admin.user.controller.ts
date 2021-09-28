import { Request, Response } from 'express'
import httpStatus from '../constant/status.constant'
import UserModel from '../model/user.model'

export const getUsers = async (req: Request, res: Response) => {
  const queryUsers = await UserModel.find({})

  if (!queryUsers) {
    return res.sendStatus(httpStatus.NO_CONTENT)
  }

  const users = queryUsers.map((user) => {
    const newUser = JSON.parse(JSON.stringify(user))
    delete newUser.password
    return newUser
  })

  return res.status(httpStatus.OK).send(users)
}

export const searchUser = async (req: Request, res: Response) => {
  res.sendStatus(httpStatus.OK)
}

export const blockUser = async (req: Request, res: Response) => {
  res.sendStatus(httpStatus.OK)
}
