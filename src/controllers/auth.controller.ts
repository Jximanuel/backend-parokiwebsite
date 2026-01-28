import { Request, Response } from "express"
import User from "../models/user.models"
import * as Yup  from "yup"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userMiddleware, { AuthRequest } from "../middleware/user.middleware"


const regisValidate = Yup.object().shape({
    username : Yup.string().required(),
    email : Yup.string().required().email("email wajib diisi"),
    password : Yup.string().required()
})

export default {
    
    async register (req: Request, res:Response){
        try {


            await regisValidate.validate(req.body, { abortEarly: false})
            


            const { username, email, password} = req.body

            const saltRound = 16

            const hashedPassword = await bcrypt.hash(password, saltRound)

            const result = await User.create({
                username, 
                email, 
                password: hashedPassword
            })

            res.status(200).json({ msg: "register berhasil", data: result})





        } catch (error) {
            res.status(400).json({msg: "regsiter gagal", error})
        }
    },                                                                                                                                                                                                                                                                                                                          

    async login (req: Request, res:Response){
        try {
            const jwt_secret = process.env.JWT_SECRET
            const { identifier, password} = req.body
            if(!identifier || !password) {
                return res.status(400).json({msg: "field harus diisi"})
            }

            const user = await User.findOne({
                $or: [
                    {username : identifier},
                    {email : identifier}
                 ]
            })


            if(!user) {
                return res.status(400).json({ msg: "username tidak ditemukan"})
            }

            const compairePassowrd = await bcrypt.compare(password, user.password)
            if(!compairePassowrd) {
                return res.status(400).json({ msg: "password tidak sesuai"})
            }

            const token = jwt.sign(
                {
                id: user._id,
                role : user.role
                },jwt_secret as string, 
                {
                    expiresIn: "1h"
                } )

            res.status(200).json({ msg: "berhasil login", data: token})
            
        } catch (error) {
            return res.status(400).json({ msg: "username dan password salah"})
        }
        
    },

    async getUser (req: AuthRequest, res:Response){
        try {

            const responseUser = ({
                userid : req.user?.id,
                role: req.user?.role
            })
          res.status(200).json({
            msg: "berhasil mengambil data",
            data: responseUser


          })
          
        } catch (error) {
            return res.status(400).json({ msg: "username dan password salah"})
        }
    }
    
}