import mongoose, { Schema } from "mongoose";




export enum userRole {
    ADMIN = "admin",
    USERS = "user"
}

export interface Iuser extends Document {
    username : string,
    email : string,
    password : string,
    role : userRole
    
}


const userSchema : Schema<Iuser> = new Schema(
    {
        username:{
            type: String,
            required : true,
            unique : true,
        },

        
        email:{
            type: String,
            required : true,
        },
        
        password:{
            type: String,
            required : true,
        },
        role : {
            type: String,
            enum : Object.values(userRole),
            default: userRole.USERS
        }
    },
    { timestamps : true}
)


const User = mongoose.model<Iuser>("User", userSchema)

export default User