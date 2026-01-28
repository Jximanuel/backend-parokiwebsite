import bcrypt from "bcrypt"
import mongoose from "mongoose"
import User, { userRole } from "../models/user.models"
import env from 'dotenv'
env.config()

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string
const ADMIN_PASSOWRD = process.env.ADMIN_PASS as string

console.log(ADMIN_EMAIL, ADMIN_PASSOWRD)

async function seedAdmin() {
    await mongoose.connect(process.env.MONGO_URL as string, {
        dbName: process.env.DB_NAME
    })

    const existingAdmin = await User.findOne({role: "admin"})
    if(existingAdmin){
        console.log("admin sudah ada")
        process.exit()
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSOWRD, 16)

    await User.create({
        
        username : "admin",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: userRole.ADMIN

    })

     console.log("Admin berhasil dibuat");
    process.exit(0);


}

seedAdmin()
