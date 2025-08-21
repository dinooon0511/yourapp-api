import crypto from 'crypto'

export function checkTelegramInitData(initData: string, botToken: string){
  const urlParams = new URLSearchParams(initData)
  const checkHash = urlParams.get('hash')
  if (!checkHash) return false

  const pairs: string[] = []
  urlParams.sort()
  for (const [key, value] of urlParams) {
    if (key === 'hash') continue
    pairs.push(`${key}=${value}`)
  }
  const dataCheckString = pairs.join('\n')

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest()
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex')

  return hmac === checkHash
}
