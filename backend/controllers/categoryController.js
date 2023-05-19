var slugify = require('slugify')
const {failResponse, validationError, successResponse} = require("../helpers/response");
const Category = require("../models/admin/categoryModel");


const addCategory = async (req,res) => {
    try {
        if(!req.body.name) return res.send(validationError("You need to add Category name first!"));
        const existingCat = await Category.findOne({name: req.body.name});
        if(existingCat) return res.send(validationError("This Category slug already exist"));
        const addCat = await new Category({...req.body, slug: slugify(req.body.name).toLowerCase()}).save();
        res.send(successResponse("Category added Successfully", addCat));
    } catch (error) {
        console.log("error", error);
        failResponse("_", {}, error);
    }
}

module.exports = {addCategory}