import express, { Application, Response } from 'express'
import cors from 'cors'

import config from './config'
import connect from './database/connect'
import routes from './routes'

const app: Application = express()
app.use(cors())
app.use('/', (_, res: Response) => {
  let msg
  if (config.NOTE_ENV === 'production') {
    msg = 'API prod connected'
  } else {
    msg = 'API dev connected'
  }
  res.status(200).send(msg)
})
// for parsing application/json and parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// for save static files in public folder
app.use(express.static('public'))

app.listen(config.port, () => {
  console.log(`Oneforall has been ready to hear you on port ${config.port}`)
  connect()
  routes(app)
})
