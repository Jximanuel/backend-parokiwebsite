import cloudinary from "../utility/cloudinary";
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary";



const  storage  = new CloudinaryStorage({
    cloudinary,
    params : {
        folder :  "paroki_folder",
        allowed_folder : ["jpg", "png", "jpeg"]

        
        
    }
})


const upload  = multer({ storage})


export default upload   