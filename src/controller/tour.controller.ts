import { Request, Response } from 'express'
import _ from 'lodash'

import httpStatus from '../constant/status.constant'
import TourModel from '../model/tour.model'
import BookingModel, { bookingStatus } from '../model/booking.model'
import cloudinary from '../config/cloudinary'

export const getTours = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    name = '',
    phone = '',
    price,
    createdAt = '',
    address = '',
    sort = '',
    discount = false,
  } = req.query

  const skip = (Number(page) - 1) * Number(limit)
  const dateQuery = createdAt ? new Date(createdAt as string) : new Date()
  dateQuery.setDate(dateQuery.getDate() + 1)

  try {
    const tours = await TourModel.find({
      name: new RegExp(name as string, 'i'),
      phone: new RegExp(phone as string, 'i'),
      address: new RegExp(address as string, 'i'),
      createdAt: {
        $lte: dateQuery,
      },
      ...(discount === 'true' ? { discount: { $gt: 0 } } : {}),
      ...(price ? { price: { $lte: Number(price) } } : {}),
    })
      .sort({ _id: sort === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit))

    const totalTour = await TourModel.count()
    const pages = Math.ceil(totalTour / Number(limit))

    return res.status(httpStatus.OK).send({
      data: tours,
      total: totalTour,
      page,
      limit,
      pages,
    })
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const getTourDetail = async (req: Request, res: Response) => {
  const { tourId } = req.params

  try {
    const tour = await TourModel.findById(tourId)
    return res.status(httpStatus.OK).send(tour)
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const addTours = async (req: Request, res: Response) => {
  const data = req.body

  try {
    await TourModel.insertMany([{ ...data, createdAt: new Date(), star: 10 }])
    return res.status(httpStatus.OK).send({ message: 'Created successfuly' })
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const updateTour = async (req: Request, res: Response) => {
  const { tourId } = req.params
  const { name, address, description, email, image, phone, price, discount } =
    req.body

  try {
    await TourModel.updateOne(
      { _id: tourId },
      { name, address, description, email, image, phone, price, discount }
    )
    return res.status(httpStatus.OK).send({ message: 'Updated successfuly' })
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const deleteTour = async (req: Request, res: Response) => {
  const { tourId } = req.params

  try {
    await TourModel.deleteOne({ _id: tourId })
    return res.status(httpStatus.OK).send({ message: 'Deleted successfuly' })
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const upload = async (req: Request, res: Response) => {
  const photo = req.file

  try {
    if (photo) {
      const { url } = await cloudinary.uploader.upload(photo?.path)
      return res.status(httpStatus.OK).send({
        url,
      })
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const bookTour = async (req: Request, res: Response) => {
  const { tourId } = req.params
  const { dateFrom, dateTo, phone, email } = req.body

  try {
    const tour = await TourModel.findById(tourId)
    await BookingModel.insertMany([
      {
        tour,
        dateFrom,
        dateTo,
        status: bookingStatus[bookingStatus.PENDING],
        createdAt: new Date(),
        phone,
        email,
      },
    ])
    return res.status(httpStatus.OK).send({ message: 'Created successfuly' })
  } catch (error: any) {
    const errs = _.map(error.errors, (item) => item.message)
    return res.status(httpStatus.BAD_REQUEST).send(errs[0])
  }
}
