import { Router } from 'express'
import { getUsers, searchUser } from '../controller/admin.user.controller'
const router = Router()

router.get('/', getUsers)
router.post('/', searchUser)

export default router
