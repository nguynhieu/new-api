import { Request, Response } from 'express'

import ContactModel from '../model/contact.model'
import httpStatus from '../constant/status.constant'

export const sendContact = async (req: Request, res: Response) => {
  const contact = req.body

  try {
    console.log(contact)
    // const hotelList = await ContactModel.insertMany(contact)

    return res
      .status(httpStatus.OK)
      .json({ message: 'Send contact successfuly' })
  } catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}
 