import { Router } from 'express'

import { bookTour } from '../controller/tour.controller'

const router = Router()

router.post('/:tourId/book', bookTour)

export default router
