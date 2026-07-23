import express from 'express'
import customersRoutes from './src/routes/customers-routes.js'
import ordersRoutes from './src/routes/orders-routes.js'
import errorMiddleware from './src/middleware/error-middleware.js'


const app = express()
const port = 3000

app.use(express.json())

app.use(customersRoutes)
app.use(ordersRoutes)
app.use(errorMiddleware)

app.listen(port, () => {
    console.log( `Servidor rodando na porta ${port}`)
})