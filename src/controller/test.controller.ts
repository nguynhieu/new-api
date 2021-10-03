import httpStatus from '../constant/status.constant'
import { Request, Response } from 'express'

export const testController = (req: Request, res: Response) => {
  res.status(httpStatus.OK).send('test')
}
