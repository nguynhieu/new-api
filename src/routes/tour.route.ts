import { Router } from 'express'
import multer from 'multer'

const uploadMulter = multer({ dest: 'src/public/uploads/' })

import {
  getTours,
  getTourDetail,
  addTours,
  updateTour,
  deleteTour,
  upload,
  bookTour,
} from '../controller/tour.controller'

const router = Router()

router.get('/', getTours)
router.get('/:tourId', getTourDetail)
router.post('/', addTours)
router.put('/:tourId', updateTour)
router.delete('/:tourId', deleteTour)
router.post('/upload', uploadMulter.single('photo'), upload)
router.post('/:tourId/book', bookTour)

export default router
