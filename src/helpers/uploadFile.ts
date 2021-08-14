import { stringify, v4 as uuidv4 } from "uuid";
import multer from "multer";

//No se donde ubicar esto

export const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        const name = uploadFiles(file);

        cb(null, name);
    },
});


export const uploadFiles = (file:any) => {

    const profilePicture = file;
    
        const nameTemp = profilePicture.originalname.split('.');

        const extension = nameTemp[nameTemp.length - 1];
    
        const nameFile = uuidv4() + '.' + extension;

        return(nameFile)

}

 