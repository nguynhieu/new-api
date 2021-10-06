import { Router } from 'express'
import { login, register } from '../controller/admin.auth.controller'
const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router
