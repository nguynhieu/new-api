import { Router } from 'express'

import { sendContact } from '../controller/contact.controller'

const router = Router()

router.post('/', sendContact)

export default router
