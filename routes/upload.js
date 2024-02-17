import express from 'express';
import multer from 'multer';
import { getImages, getSearchImages, uploadImage } from '../controllers/uploadController.js';
import { requiresSignIn } from '../middleware/authMiddleware.js';
import path from 'path';
import {fileURLToPath} from 'url';

export const uploadRouter=express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

uploadRouter.post('/uploads',requiresSignIn,upload.single('image'),uploadImage);   
uploadRouter.get('/test',getImages);
uploadRouter.get('/download/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    const imagePath=path.resolve(__dirname,'..','uploads',imageName);
    res.download(imagePath);
});
uploadRouter.get('/search/:query',getSearchImages)
