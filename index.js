import customersRoutes from './src/routes/customers.routes.js'
import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

app.use(customersRoutes)

app.listen(port, () => {
    console.log( `Servidor rodando na porta ${port}`)
})