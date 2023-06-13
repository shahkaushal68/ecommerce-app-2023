
const { failResponse, successResponse } = require("../helpers/response");
var slugify = require('slugify')
const Product = require("../models/admin/productModel");

const addProduct = async (req,res) => {
    //console.log("fs -----", fs.readFileSync('/uploads/product-images/' + req.file.filename));
    //console.log("new", {...req.body, image:req.file.filename});
    try {
       const productData = await new Product({...req.body, slug:slugify(req.body.name), image:req.file.filename}).save();
       res.send(successResponse("Product added Succesfully", productData));
    } catch (error) {
         //console.log("error", error);
         failResponse("_", {}, error);
     }
}

const getAllProducts = async (req,res) => {
    try {
        const allProducts = await Product.find({}).limit(12).sort({"createdAt": -1}).populate("category");
        res.send(successResponse("Fetch All Products Succesfully", allProducts));
    } catch (error) {
        //console.log("error", error);
        failResponse("_", {}, error);
    }
}

const getSingleProduct = async (req,res) => {
    //console.log(req.params.slug);
    try {
        const singleProduct = await Product.findOne({ slug: req.params.slug }).populate("category");
        res.send(successResponse("Fetch Product Succesfully", singleProduct));
    } catch (error) {
        //console.log("error", error);
        failResponse("_", {}, error);
    }
}

const getProductPhoto = async (req,res) => {
    //console.log("id", req.params.id);
    try {
        const productImage = await Product.findById(req.params.id).select("image");
        res.send(successResponse("Fetch Product Image Succesfully", productImage));
    } catch (error) {
        //console.log("error", error);
        failResponse("_", {}, error);
    }
}

const updateProduct = async (req,res) => {
    //console.log("id", req.params.id);
    try {
        const productUpdate = await Product.findByIdAndUpdate(req.params.id, {...req.body, slug:slugify(req.body.name), image:req.file.filename}, {new:true});
        res.send(successResponse("Product Updated Succesfully", productUpdate));
    } catch (error) {
        //console.log("error", error);
        failResponse("_", {}, error);
    }
}

const deleteProduct = async (req,res) => {
   // console.log("id", req.params.id);
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send(successResponse("Product deleted Succesfully"));
    } catch (error) {
        //console.log("error", error);
        failResponse("_", {}, error);
    }
}

const filterProduct = async (req,res) => {
    // console.log("id", req.params.id);
     try {
        var {checkVal, checkRadio} = req.body;
        let args = {};
        if(checkVal.length > 0) args.category = checkVal;
        if(checkRadio.length > 0) args.price = {$gte:checkRadio[0], $lte:checkRadio[1]}
        //console.log({args});
        const products = (await Product.find(args).populate("category"));
        if(products){
            res.send(successResponse("filter products get successfully",products));
        }else{
            res.send(successResponse("filter products get successfully", {}));
        }
     } catch (error) {
         //console.log("error", error);
         failResponse("_", {}, error);
     }
}

const productListController = async (req,res) => {
    // console.log("id", req.params.id);
     try {
        //number of records you want to show per page
        const perPage = 6;
        //Total number of records in database
        const total = await Product.count();
        //Get current page number
        const pageNumber = req.query.page ? req.query.page : 1;
        // Calculating number of pagination links are required
        const pages = Math.ceil(total/perPage);
        // get records to skip
        const startFrom = (pageNumber - 1) * perPage;

        const paginateProducts = await Product.find({}).sort({"createdAt" : -1}).skip(startFrom).limit(perPage);
       
        res.send(successResponse("products get successfully", {totalCount:total, paginateProducts}));
     } catch (error) {
         //console.log("error", error);
         failResponse("_", {}, error);
     }
}

module.exports = {addProduct, getAllProducts, getSingleProduct, getProductPhoto, updateProduct, deleteProduct, filterProduct, productListController}