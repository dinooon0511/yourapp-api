import { Router } from 'express'

const r = Router()

r.get('/', async (_req, res) => {
  res.json({ me: null })
})

export default r
