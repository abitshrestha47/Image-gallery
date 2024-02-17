import jwt from 'jsonwebtoken';

export const requiresSignIn=async(req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.replace('Bearer ', '');
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            next();
        }
        else{
            res.status(200).json({success:false,message:'rquires JWT'});
        }
    } catch (error) {
        if(error.message==='jwt expired'){
            res.status(200).json({success:false,message:'jwt expired'});
        }else if(error.message==='invalid token'){
            res.status(200).json({success:false,message:'invalid token'});
        }else if(error.message==='invalid signature'){
            res.status(200).json({success:false,message:'invalid signature'});
        }else{
            res.status(200).json({success:false,message:'internal error'});
        }
        console.log(error.message);
    }
}