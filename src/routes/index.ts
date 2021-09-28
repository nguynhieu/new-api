import { Application } from 'express'
import authRoute from './auth.route'
import testRoute from './test.route'
import adminAuthRoute from './admin.auth.route'
import adminUserRoute from './admin.user.route'
import { checkAuthorized } from '../middleware/authorization.middleware'

const routes = (app: Application) => {
  app.use('/test', testRoute)
  app.use('/api/admin/auth', adminAuthRoute)
  app.use('/api/admin/user', checkAuthorized, adminUserRoute)
  app.use('/api/auth', authRoute)
}

export default routes
