import { createClient } from "redis"

const redisClient = createClient({
    url: "redis://localhost:6379"
})

redisClient.on("error", (error) => {
    console.error("Erro na conexão com Redis:", error)
})

export async function connectRedis() {
    await redisClient.connect()
    console.log("Redis conectado com sucesso")
}

export default redisClient