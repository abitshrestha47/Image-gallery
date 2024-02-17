import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username){
        return res.send({message:'Username is required!'});
    }
    if(!email){
        return res.send({message:'Email is required!'});
    }
    if(!password){
        return res.send({message:'Password is required!'});
    }
    try {
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.send({message:'Email already exists!'});
        }
        const hasedPassword=await bcrypt.hash(password,10);
        const newUser=new User({username,email,password:hasedPassword});
        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            successs:true,
        });
    } catch (error) {
        console.log(error);
    }
}

export const checkUser=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email){
        return res.send({message:'Email is required!'});
    }
    if(!password){
        return res.send({message:'Password is required!'});
    }
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'Email is not valid!',success:false});
        }
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(401).json({message:'Invalid password!',success:false});
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1hr',
        });
        res.status(200).send({
            success:true,
            message:'login successful',
            user:{
                username:user.username,
                email:user.email,
            },
            token,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAuthor=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const user=await User.findById(id);
        res.status(200).json({user:{username:user.username}});
    } catch (error) {
        console.log(error);
    }
}

export const getAllAuthor=async(req,res,next)=>{
    try {
        const users = await User.find({}).select('-password');
        // console.log(users);
        res.status(200).send({
            users:users
        }); 
       } catch (error) {
        console.log(error);
    }
}

export const updateAuthor=async(req,res,next)=>{
    try {
    } catch (error) {
        console.log(error);
    }
}