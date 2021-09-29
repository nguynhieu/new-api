import { Request, Response } from 'express'
import httpStatus from '../constant/status.constant'
import UserModel from '../model/user.model'
import { uploadAvatar } from '../service/firebase'

export const getProfile = async (req: Request, res: Response) => {
  const { _id } = req.payloadToken

  try {
    const queryUser = await UserModel.findById(_id, { password: 0 })

    return res.status(httpStatus.OK).send(queryUser)
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  const {
    body: requestBody,
    payloadToken: { _id },
  } = req

  try {
    const queryUser = await UserModel.findOne({ _id })
    if (!queryUser) {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }

    const cloneUser = JSON.parse(JSON.stringify(queryUser))

    // If there's a new avatar, upload new avatar to Firebase and get avatar url instead of base64 string
    let updatedUser
    if (cloneUser.avatar !== requestBody.avatar) {
      const avatarName = requestBody.username
      const avatarUrl = await uploadAvatar(avatarName, requestBody.avatar)

      updatedUser = { ...cloneUser, ...requestBody, avatar: avatarUrl }
    } else {
      updatedUser = { ...cloneUser, ...requestBody }
    }

    await UserModel.replaceOne({ _id }, updatedUser)
    const newUser = await UserModel.findOne({ _id })

    return res.status(httpStatus.OK).send(newUser)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}
