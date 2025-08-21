import jwt from 'jsonwebtoken'
import { env } from '../../config/env'

export function signAccess(payload: object){
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: `${env.ACCESS_TTL_MIN}m` })
}
export function signRefresh(payload: object){
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: `${env.REFRESH_TTL_DAYS}d` })
}
