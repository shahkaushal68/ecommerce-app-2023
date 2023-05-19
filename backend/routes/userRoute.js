const express = require('express');
const { getLoginUserDetails } = require('../controllers/userController');
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();



router.get('/loginUserDetails', verifyToken, getLoginUserDetails);



  
module.exports = router