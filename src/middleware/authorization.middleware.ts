import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

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

  const token = _.split(req.headers['authorization'], ' ')[1]

  try {
    const payload = jwt.verify(token, config.jwtPrivateKey)

    req.payloadToken = payload

    next()
  } catch (error) {
    return res.status(httpStatus.FORBIDDEN).send('Forbidden')
  }
}
