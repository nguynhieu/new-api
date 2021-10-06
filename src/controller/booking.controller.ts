import { Request, Response } from 'express'
import _ from 'lodash'

import httpStatus from '../constant/status.constant'
import BookingModel from '../model/booking.model'

export const getBookingHistory = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(limit)

  try {
    const tour = await BookingModel.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(Number(limit))
    return res.status(httpStatus.OK).send(tour)
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}

export const updateStatusBooking = async (req: Request, res: Response) => {
  const { status } = req.body
  const { bookingId } = req.params

  if (!_.includes(['PENDING', 'REJECTED', 'ACCEPTED'], status)) {
    return res.status(httpStatus.BAD_REQUEST).send('Status must be a enum')
  }

  try {
    await BookingModel.findOneAndUpdate(
      { _id: bookingId },
      {
        status,
      }
    )

    return res.status(httpStatus.OK).send('Updated succesfuly')
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }
}
