import path from "path";
import multer from "multer";


export const upload = multer({

    storage: multer.diskStorage({}),

    fileFilter: (req, file, cb:any) => {
        
        let extension = path.extname(file.originalname);

        if (extension !== ".jpg" && extension !== ".png") {
           
            cb(new Error('Tipo de archivo no soportado '),false);
            return;
        }
        cb(null, true);

    }

})