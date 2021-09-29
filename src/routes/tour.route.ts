import { Router } from 'express'
import {
  getTours,
  addTours,
  updateTour,
  deleteTour,
} from '../controller/tour.controller'

const router = Router()

router.get('/', getTours)
router.post('/', addTours)
router.put('/:tourId', updateTour)
router.delete('/:tourId', deleteTour)

export default router
