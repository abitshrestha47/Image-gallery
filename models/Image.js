import mongoose from "mongoose";

const ImageSchema=mongoose.Schema({
    imageName:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    tags:{
        type: [String], 
        required: true,
    },
    slug:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

export const Image=mongoose.model('images',ImageSchema);
