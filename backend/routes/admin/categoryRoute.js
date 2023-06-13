const express = require('express');
const router = express.Router();
const {addCategory, updateCategory, viewAllCategory, viewSingleCategory, deleteCategory} = require("../../controllers/categoryController");
const { verifyToken, verifyTokenAndAdmin } = require('../../middlewares/authMiddleware');

router.get("/", viewAllCategory);
router.get("/:slug", viewSingleCategory);
router.post('/add', verifyToken, verifyTokenAndAdmin, addCategory);
router.put('/:slug', verifyToken, verifyTokenAndAdmin, updateCategory);
router.delete("/:slug", verifyToken, verifyTokenAndAdmin, deleteCategory);

module.exports = router