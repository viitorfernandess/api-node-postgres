import express from 'express'
import usersController from '../controllers/users-controller.js'
import loginLimiter from '../middleware/rate-limit.js'

const router = express.Router()

router.post("/users", usersController.create)
router.post("/login", loginLimiter, usersController.login)

export default router