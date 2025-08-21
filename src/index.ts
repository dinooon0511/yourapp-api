import { app } from './server'
import { env } from './config/env'

app.listen(env.PORT, () => {
  console.log(`API on http://localhost:${env.PORT}`)
})
