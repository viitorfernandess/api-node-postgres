import app from './app.js'
import { connectRedis } from './src/config/redis.js'
const port = 3000

async function startServer() {
    await connectRedis()

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    })
}

startServer()