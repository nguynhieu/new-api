import dotenv from 'dotenv'
import express, { Application } from 'express'
import connect from './database/connect'
import routes from './routes'

dotenv.config()
const app: Application = express()
const port = process.env.PORT || 6969

app.listen(port, () => {
  console.log(`Oneforall has been ready to hear you on port ${port}`)
  connect()
  routes(app)
})
