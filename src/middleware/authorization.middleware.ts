import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import httpStatus from '../constant/status.constant'

export const checkAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers['authorization']) {
    return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized')
  }

  try {
    const payload = jwt.verify(
      req.headers['authorization'] || '',
      config.jwtPrivateKey
    )
    req.payloadToken = payload

    next()
  } catch (error) {
    return res.status(httpStatus.FORBIDDEN).send('Forbidden')
  }
}
