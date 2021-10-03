import { NextFunction, Request, Response } from 'express'

export const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('test middlewar!')
  return next()
}
