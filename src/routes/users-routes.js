import express from 'express'
import usersController from '../controllers/users-controller.js'

const router = express.Router()

router.post("/users", usersController.create)

export default router