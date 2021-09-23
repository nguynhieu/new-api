import { Router } from 'express'
import { testController } from '../controller/test.controller'
import { testMiddleware } from '../middleware/test.middleware'

const router = Router()

router.get('/', testMiddleware, testController)

export default router
