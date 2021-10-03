import httpStatus from '../constant/status.constant'
import { Request, Response } from 'express'
import config from '../config'

export const testController = (req: Request, res: Response) => {
  let msg
  if (config.NOTE_ENV === 'production') {
    msg = 'API prod connected'
  } else {
    msg = 'API dev connected'
  }
  res.status(httpStatus.OK).send(msg)
}
