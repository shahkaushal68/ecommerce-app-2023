var slugify = require('slugify');
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

const updateCategory = async (req,res) => {
    try {
        if(!req.body.name) return res.send(validationError("You need to add Category name first!"));
        const existingCat = await Category.findOne({name: req.body.name});
        if(existingCat) return res.send(validationError("This Category slug already exist"));
        const updateCat = await Category.findOneAndUpdate({slug:req.params.slug}, {name:req.body.name, slug:slugify(req.body.name)}, {new:true});
        res.send(successResponse("Category Updated Successfully", updateCat));
    } catch (error) {
        console.log("error", error);
        failResponse("_", {}, error);
    }
}

const viewAllCategory = async (req,res) => {
    try {
        const allCats = await Category.find({});
        res.send(successResponse("Category Listed Succesfully", allCats));
    } catch (error) {
        console.log("error", error);
        failResponse("_", {}, error);
    }
}

const viewSingleCategory = async (req,res) => {
    try {
        const singleCat = await Category.findOne({slug:req.params.slug});
        res.send(successResponse("Single Category display Succesfully", singleCat));
    } catch (error) {
        console.log("error", error);
        failResponse("_", {}, error);
    }
}

const deleteCategory = async (req,res) => {
    try {
        await Category.findOneAndDelete({slug:req.params.slug});
        res.send(successResponse("Category deleted Succesfully"));
    } catch (error) {
        console.log("error", error);
        failResponse("_", {}, error);
    }
}
module.exports = {addCategory, updateCategory, viewAllCategory, viewSingleCategory, deleteCategory}