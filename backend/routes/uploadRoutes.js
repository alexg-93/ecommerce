
 import express from 'express'
 import multer from 'multer'
 import path from 'path'

 const router = express.Router()

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
    },
 
})


const checkFileType = (file,cb) =>{
     const fileTypes = /jpg|jpg|png|svg|jpeg/
     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
     const mimeType = fileTypes.test(file.mimetype)
     
     if(extName && mimeType){
       
         return cb(null,true)
        }else{
            cb('Images only!')
        }
    }

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } ,// 5MB
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

router.post('/',upload.single('image'),(req,res)=>{
    res.send(`/${req.file.path}`)
})

 export default router