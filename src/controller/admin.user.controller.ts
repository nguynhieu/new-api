import { Request, Response } from 'express'
import httpStatus from '../constant/status.constant'
import UserModel from '../model/user.model'
import { UserDocument } from '../model/user.model'

const generateNonPasswordUsers = (users: UserDocument[]) => {
  return users.map((user) => {
    const newUser = JSON.parse(JSON.stringify(user))
    delete newUser.password
    return newUser
  })
}

export const getUsers = async (req: Request, res: Response) => {
  const queryUsers = await UserModel.find({})

  if (!queryUsers) {
    return res.sendStatus(httpStatus.NO_CONTENT)
  }

  const users = generateNonPasswordUsers(queryUsers)

  return res.status(httpStatus.OK).send(users)
}

export const searchUser = async (req: Request, res: Response) => {
  const { q } = req.query

  if (!q) {
    return res.status(httpStatus.BAD_REQUEST).send('Query string is not valid')
  }

  try {
    const queryUsers = await UserModel.find({
      $or: [
        { email: new RegExp(q as string) },
        { phone: new RegExp(q as string) },
        { username: new RegExp(q as string) },
      ],
    })

    const users = generateNonPasswordUsers(queryUsers)

    return res.status(httpStatus.OK).send(users)
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const blockUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const queryUser = await UserModel.findById(userId)
    if (queryUser) {
      queryUser.disable = !queryUser.disable
      await queryUser.save()
    }

    return res.send(queryUser)
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}
