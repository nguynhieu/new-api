import { Router } from 'express'
import {
  getProfile,
  updateProfile,
  changePassword,
} from '../controller/profile.controller'
import { validateUpdatedProfile } from '../middleware/profile.middleware'

const router = Router()

router.get('/', getProfile)
router.put('/', validateUpdatedProfile, updateProfile)
router.post('/change-password', changePassword)

export default router
