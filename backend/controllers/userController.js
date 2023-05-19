const { failResponse, successResponse } = require("../helpers/response");
const User = require("../models/userModel");

const getLoginUserDetails = async (req,res) => {
    try {
        //console.log("req", req.user);
        const userDetails = await User.findById(req.user.id, '-password');
        //console.log("userDetails", userDetails);
        res.send(successResponse("user details get successfully", userDetails))
    } catch (error) {
        //console.log("error", error);
        res.send(failResponse("_",{},error));
    }
}



module.exports = {getLoginUserDetails}