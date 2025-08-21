import { Router } from 'express'
import auth from './modules/auth/routes'
import me from './modules/me/routes'

const r = Router()

r.use('/auth', auth)
r.use('/me', me)

export default r
