import 'dotenv/config'

const required = (key: string) => {
  const v = process.env[key]
  if (!v) throw new Error(`Missing env ${key}`)
  return v
}

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  DATABASE_URL: required('DATABASE_URL'),
  JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET'),
  ACCESS_TTL_MIN: Number(process.env.ACCESS_TTL_MIN ?? 15),
  REFRESH_TTL_DAYS: Number(process.env.REFRESH_TTL_DAYS ?? 30),
  CORS_ORIGIN: required('CORS_ORIGIN'),
  TELEGRAM_BOT_TOKEN: required('TELEGRAM_BOT_TOKEN')
}
