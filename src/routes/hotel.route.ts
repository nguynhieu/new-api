import { Router } from 'express'
import {
  addHotel,
  deleteHotel,
  getHotelList,
  updateHotel,
} from '../controller/hotel.controller'
import { checkAuthorized } from '../middleware/authorization.middleware'

const router = Router()

router.get('/', getHotelList)
router.post('/', checkAuthorized, addHotel)
router.put('/:hotelId/update', checkAuthorized, updateHotel)
router.delete('/:hotelId/delete', checkAuthorized, deleteHotel)

export default router
