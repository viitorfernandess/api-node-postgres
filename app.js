import express from 'express'

import customersRoutes from './src/routes/customers-routes.js'
import ordersRoutes from './src/routes/orders-routes.js'
import errorMiddleware from './src/middleware/error-middleware.js'
import usersRoutes from './src/routes/users-routes.js'

const app = express()

app.use(express.json())

app.use(customersRoutes)
app.use(ordersRoutes)
app.use(usersRoutes)
app.use(errorMiddleware)

export default app