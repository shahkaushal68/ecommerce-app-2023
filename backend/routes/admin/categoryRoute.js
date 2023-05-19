const express = require('express');
const router = express.Router();
const {addCategory} = require("../../controllers/categoryController");
const { verifyToken, verifyTokenAndAdmin } = require('../../middlewares/authMiddleware');

router.post('/add', verifyToken, verifyTokenAndAdmin, addCategory);


module.exports = router