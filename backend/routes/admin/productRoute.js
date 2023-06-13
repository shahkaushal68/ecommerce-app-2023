const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getSingleProduct, getProductPhoto, updateProduct, deleteProduct, filterProduct, productListController } = require('../../controllers/productController');
const  upload  = require('../../helpers/imageUpload');
const { verifyToken, verifyTokenAndAdmin } = require('../../middlewares/authMiddleware');

router.post("/add", verifyToken, verifyTokenAndAdmin, upload.single("productImage"), addProduct);
//router.post("/add",  upload.single("productImage"), addProduct);
router.get("/", getAllProducts);
router.get("/single/:slug", getSingleProduct);
router.get("/productPhoto/:id", getProductPhoto);
router.put("/:id", verifyToken, verifyTokenAndAdmin, upload.single("productImage"), updateProduct);
router.delete("/:id", verifyToken, verifyTokenAndAdmin, deleteProduct);
router.post("/filter", filterProduct);
router.get("/product-list", productListController);

module.exports = router