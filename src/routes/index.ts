import { Application } from 'express'
import testRoute from './test.route'

const routes = (app: Application) => {
  app.use('/test', testRoute)
}

export default routes
