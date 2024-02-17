import { Image } from "../models/Image.js";
import slug from "slug";

export const uploadImage=async(req,res,next)=>{
    const imageName=req.file.filename;
    const {tags}=req.body;
    try {
        const slugname=slug(tags);
        const newImage=new Image({imageName,author:req.user,tags,slug:slugname});
        await newImage.save();
    } catch (error) {
        console.log(error);
    }
}

export const getImages=async(req,res,next)=>{
    try {
        const images=await Image.find({});
        res.status(200).json({message:'All images',success:true,images});
    } catch (error) {
        console.log(error);
    }
}

export const getSearchImages=async(req,res,next)=>{
    const {query}=req.params;
    const slugQuery=slug(query);
    try {
        const filterImages = await Image.find(
            { 
                "$or":[
                    {'slug':{$regex:slugQuery}}
                ]
            });
        console.log(filterImages);
        res.status(200).json(filterImages);
    } catch (error) {
        console.log(error);
    }
}