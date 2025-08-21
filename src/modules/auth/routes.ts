import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { env } from '../../config/env'
import { checkTelegramInitData } from './telegram'
import { signAccess, signRefresh } from './tokens'

const prisma = new PrismaClient()
const r = Router()

const tgSchema = z.object({ initData: z.string().min(10) })

r.post('/telegram', async (req, res) => {
  const { initData } = tgSchema.parse(req.body)
  if (!checkTelegramInitData(initData, env.TELEGRAM_BOT_TOKEN)) {
    return res.status(401).json({ error: 'bad initData' })
  }
  const params = new URLSearchParams(initData)
  const userRaw = params.get('user')
  const user = userRaw ? JSON.parse(userRaw) : undefined
  if (!user?.id) return res.status(400).json({ error: 'no tg user' })

  const dbUser = await prisma.user.upsert({
    where: { tgId: String(user.id) },
    update: { name: user.first_name ?? 'User' },
    create: { authType: 'telegram', tgId: String(user.id), name: user.first_name ?? 'User' }
  })

  const access = signAccess({ sub: dbUser.id })
  const refresh = signRefresh({ sub: dbUser.id })

  res
    .cookie('access_token', access, { httpOnly: true, sameSite: 'lax', secure: false })
    .cookie('refresh_token', refresh, { httpOnly: true, sameSite: 'lax', secure: false })
    .json({ ok: true, user: { id: dbUser.id, name: dbUser.name } })
})

export default r
