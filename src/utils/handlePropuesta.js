import multer from "multer";


const storage1 = multer.diskStorage({
    
    filename: function (req, file, cb) {
        let nombre = file.originalname;
            cb(null, nombre)
    }
})

export const propuesta = multer({ storage: storage1 });


