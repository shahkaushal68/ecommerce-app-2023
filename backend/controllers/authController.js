const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {validationError, successResponse, failResponse} = require("../helpers/response");

const register = async (req,res) => {
    try {
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser) return res.send(validationError("This email is already Register"));
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await new User({...req.body, password: hashPassword}).save();
        res.send(successResponse("User Registration Successfully", newUser));
    } catch (error) {
        console.log("error", error);
        res.send(failResponse("Registration error",{},error));
    }
}

const login = async (req,res) => {
    try {
        //console.log("req.body", req.body);
        const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser) return res.send(failResponse("This email is not Register"));
        const comparePassword = await bcrypt.compare(req.body.password, existingUser.password);
        if(!comparePassword) return res.send(failResponse("Email / Password is wrong"));
        //console.log("existingUser", existingUser);
        const token = jwt.sign({id:existingUser._id}, process.env.JWT_SECRETE_KEY, {expiresIn:"1d"});
            res.send(successResponse("User Successfully Login", {existingUser, token}));
    } catch (error) {
        //console.log("error", error);
        res.send(failResponse("_",{},error));
    }
}

module.exports = {register, login}