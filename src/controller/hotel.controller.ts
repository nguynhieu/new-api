import { Request, Response } from 'express'
import httpStatus from '../constant/status.constant'
import HotelModel from '../model/hotel.model'

export const getHotelList = async (req: Request, res: Response) => {
  try {
    const hotelList = await HotelModel.find()

    return res.status(httpStatus.OK).json({ hotelList })
  } catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

export const addHotel = async (req: Request, res: Response) => {
  const existingHotel = await HotelModel.findOne({ name: req.body.name })
  if (existingHotel) {
    return res.status(httpStatus.BAD_REQUEST).send('hotel already exists')
  }

  console.log(req.body)

  const newHotel = new HotelModel({
    ...req.body,
  })

  try {
    const savedHotel = await newHotel.save()

    return res.status(httpStatus.OK).json({ hotel: savedHotel })
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err)
  }
}

export const updateHotel = async (req: Request, res: Response) => {
  const { hotelId: _id } = req.params

  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      _id,
      {
        ...req.body,
      },
      { new: true }
    )

    return res.status(httpStatus.OK).json({ updatedHotel })
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err)
  }
}

export const deleteHotel = async (req: Request, res: Response) => {
  const { hotelId: _id } = req.params

  try {
    await HotelModel.findByIdAndDelete(_id)

    return res.status(httpStatus.OK).send('successful delete')
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err)
  }
}
