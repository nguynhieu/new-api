import { Request, Response } from 'express'
import httpStatus from '../constant/status.constant'
import ContactModel from '../model/contact.model'

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await ContactModel.find()

    return res.status(httpStatus.OK).send(contacts)
  } catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

export const sendContact = async (req: Request, res: Response) => {
  const contact = req.body

  try {
    await ContactModel.insertMany(contact)

    return res
      .status(httpStatus.OK)
      .json({ message: 'Send contact successfuly' })
  } catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST).send(err)
  }
}
