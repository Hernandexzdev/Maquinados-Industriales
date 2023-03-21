import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const ruta = path.join(__dirname, '../upload/facturas');
        cb(null, ruta)
    },
    filename: function (req, file, cb) {
        let nombre = file.originalname;
            cb(null, nombre)
    }
})


 
export const factura = multer({ storage: storage });