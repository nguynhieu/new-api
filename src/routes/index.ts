import { Application } from 'express'
import authRoute from './auth.route'
import testRoute from './test.route'

const routes = (app: Application) => {
  app.use('/test', testRoute)
  app.use('/api/auth', authRoute)
}

export default routes
