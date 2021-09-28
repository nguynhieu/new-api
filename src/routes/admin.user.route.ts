import { Router } from 'express'
import { getUsers } from '../controller/admin.user.controller'
const router = Router()

router.get('/', getUsers)

export default router
