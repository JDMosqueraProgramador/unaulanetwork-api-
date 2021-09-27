import { stringify, v4 as uuidv4 } from "uuid";
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
import path from "path";
import User from "../models/users.models";

export const uploadFiles = (file: any) => {

    return new Promise((resolve, reject) => {
        
        const profilePicture = file;

        const nameTemp = profilePicture.originalname.split(".");

        const extension = nameTemp[nameTemp.length - 1];

        const nameFile = uuidv4() + "." + extension;

        const uploadPath = path.join(__dirname, "../../images", nameTemp);
  

        profilePicture.mv(uploadPath, (err: any) => {
            
            if (err) {
        
                reject(err)
            }
            
            resolve(nameFile)
        
        })
    
    })
}


export const uploadImage = async (coleccion:any,username:any) => {
    
    let model;

    switch (coleccion) {
        case "users":
            
            model = await User.findOne({ username })
            break;
    
        default:
            return "No se que error fue ese, me lo escribe al whatsapp"
    }

    if (model.profilePicture) {
        const nameArr = model.profilePicture.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");
        cloudinary.uploader.destroy(`profile/${public_id}`);
    }


}
 