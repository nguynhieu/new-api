import { Application } from 'express'
import { checkAuthorized } from '../middleware/authorization.middleware'
import adminAuthRoute from './admin.auth.route'
import authRoute from './auth.route'
import profileRoute from './profile.route'
import tourRoute from './tour.route'
import bookingRoute from './booking.route'
import hotelRoute from './hotel.route'

const routes = (app: Application) => {
  app.use('/api/admin', adminAuthRoute)
  app.use('/api/auth', authRoute)
  app.use('/api/profile', checkAuthorized, profileRoute)
  app.use('/api/profile', checkAuthorized, profileRoute)
  app.use('/api/profile', checkAuthorized, profileRoute)
  app.use('/api/tours', tourRoute)
  app.use('/api/booking', checkAuthorized, bookingRoute)
  app.use('/api/hotel', hotelRoute)
}

export default routes
