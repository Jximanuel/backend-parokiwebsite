import express from "express"
import cors from "cors"
import router from "./routes/api"
import router_jadwal from "./routes/jadwal.api"
import connectDb from "./utility/database"
import env from "dotenv"

env.config()


const app = express()

app.use(express.json())
app.use(cors())
connectDb()

app.use("/api", router)
app.use("/jadwal", router_jadwal)
app.get("", ( req, res) =>{
    res.json({
        status :200,
        msg: "server berjalan"
    })
})



export default app