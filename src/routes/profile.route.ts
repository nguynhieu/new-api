import { Router } from 'express'
import { getProfile, updateProfile } from '../controller/profile.controller'
import { validateUpdatedProfile } from '../middleware/profile.middleware'

const router = Router()

router.get('/', getProfile)
router.put('/', validateUpdatedProfile, updateProfile)

export default router
