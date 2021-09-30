import { Router } from 'express'
import multer from 'multer'

const uploadMulter = multer({ dest: 'src/public/uploads/' })

import {
  getTours,
  addTours,
  updateTour,
  deleteTour,
  upload,
} from '../controller/tour.controller'

const router = Router()

router.get('/', getTours)
router.post('/', addTours)
router.put('/:tourId', updateTour)
router.delete('/:tourId', deleteTour)
router.post('/upload', uploadMulter.single('photo'), upload)

export default router
