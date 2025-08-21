import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import { env } from './config/env'
import routes from './routes'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(rateLimit({ windowMs: 60_000, max: 120 }))

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/', routes)
