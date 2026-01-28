import Express from "express"
const router = Express.Router()
import { isAdmin } from "../middleware/admin.middleware"
import authController from "../controllers/auth.controller"
import jadwalController from "../controllers/jadwal.controller"
import multer from "multer"
import userMiddleware from "../middleware/user.middleware"
import upload from "../middleware/multer"



router.post("/uploadjadwal", userMiddleware, isAdmin, upload.single("image"), jadwalController.buatJadwal)
router.get("/getjadwal", jadwalController.getAllJadwal)


export default router