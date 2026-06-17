import customersRoutes from './src/routes/customers-routes.js'
import ordersRoutes from './src/routes/orders-routes.js'
import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

app.use(customersRoutes)
app.use(ordersRoutes)

app.listen(port, () => {
    console.log( `Servidor rodando na porta ${port}`)
})