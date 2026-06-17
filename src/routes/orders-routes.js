import express from 'express'
import ordersController from '../controllers/orders-controller.js'

const router = express.Router()

router.get('/orders', ordersController.index)

export default router