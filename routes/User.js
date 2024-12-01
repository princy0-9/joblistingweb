const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userschema");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
userRouter.post("/register", async (req,res) => {
    const { name, email, password, mobileno} = req.body
    const isUserExists = await User.findOne({ email})
    if(isUserExists){
        return res.send("User Already Exsits")
    } 

    const hashPassword = await bcrypt.hash(password, 10);
    try{
        const user = await User({
            name,
            email,
            password: hashPassword,
            mobileno
        })
        const savedUser = await user.save();
        res.json({ message: "User Added successfully!", data: savedUser });
    } catch (err){
        res.status(404).json({message: err.message})
    }
})

userRouter.post("/login", async (req,res) => {
    const { email, password} = req.body
    const isUserExists = await User.findOne({ email})

    try{
        if(!isUserExists){
            return res.send("Invalid Credentials")
        } 

        const isPasswordValid = await bcrypt.compare(password, isUserExists.password);
        if(!isPasswordValid){
            return res.send("Invalid Credentials")
        } 
        
        const token = await jwt.sign({_id:isUserExists._id}, process.env.JWT_SECRET_TOKEN)
        res.status(200).json({ token });
    } catch (err){
        res.status(404).json({message: err.message})
    }
})

module.exports = userRouter;