import { NextFunction, Request, Response } from 'express'

export const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('test middleware: Wow something has penetrated me 0_0!')
  return next()
}
