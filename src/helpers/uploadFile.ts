import { stringify, v4 as uuidv4 } from "uuid";
import path from "path";

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
 