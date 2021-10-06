import { Application } from 'express'
import { checkAuthorized } from '../middleware/authorization.middleware'
import adminAuthRoute from './admin.auth.route'
import authRoute from './auth.route'
import profileRoute from './profile.route'
import testRoute from './test.route'
import tourRoute from './tour.route'
import bookingRoute from './booking.route'

const routes = (app: Application) => {
  app.use('/test', testRoute)
  app.use('/api/admin', adminAuthRoute)
  app.use('/api/auth', authRoute)
  app.use('/api/profile', checkAuthorized, profileRoute)
  app.use('/api/profile', checkAuthorized, profileRoute)
  app.use('/api/profile', checkAuthorized, profileRoute)
  app.use('/api/tours', tourRoute)
  app.use('/api/booking', checkAuthorized, bookingRoute)
}

export default routes
