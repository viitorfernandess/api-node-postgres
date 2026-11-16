import express from 'express'
import usersController from '../controllers/users-controller.js'
import loginLimiter from '../middleware/rate-limit.js'
import ensureAuth from '../middleware/ensure-auth.js'

const router = express.Router()

router.post("/users", usersController.create)
router.post("/login", loginLimiter, usersController.login)
router.patch('/users/password', ensureAuth, usersController.changePassword)

export default router