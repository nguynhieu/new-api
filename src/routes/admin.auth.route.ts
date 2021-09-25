import { Router } from 'express'
import { login } from '../controller/admin.auth.controller'
const router = Router()

router.post('/login', login)

export default router
