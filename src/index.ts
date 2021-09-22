import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

dotenv.config()
const app: Application = express()
const port = process.env.PORT || 6969

// connect to DB
mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log("I am able to connect Oneforall's Database, yeahhhhh")
  })
  .catch((error) => {
    console.log('Opps I came across something :<')
    console.log(error)
  })

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, I am Oneforall API ^^')
})

app.listen(port, () => {
  console.log(`Oneforall has been ready to hear you on port ${port}`)
})
