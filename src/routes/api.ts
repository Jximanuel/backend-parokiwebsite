import express from "express"
const router = express.Router()
import authController from "../controllers/auth.controller"
import userMiddleware from "../middleware/user.middleware"


router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/me", userMiddleware, authController.getUser)

export default router