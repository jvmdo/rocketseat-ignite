import { app } from './app.js'
import { env } from './env/index.js'

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startServer()
