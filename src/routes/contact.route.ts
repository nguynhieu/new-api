import { Router } from 'express'

import { sendContact, getContacts } from '../controller/contact.controller'

const router = Router()

router.get('/', getContacts)

router.post('/', sendContact)

export default router
