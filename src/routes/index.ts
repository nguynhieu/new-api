import { Application } from 'express'
import authRoute from './auth.route'
import testRoute from './test.route'
import adminAuthRoute from './admin.auth.route'

const routes = (app: Application) => {
  app.use('/test', testRoute)
  app.use('/api/admin/auth', adminAuthRoute)
  app.use('/api/auth', authRoute)
}

export default routes
