const express = require('express');
const router = express.Router();


const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const categoryRouter = require("./admin/categoryRoute");
const productRouter = require("./admin/productRoute");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

  
module.exports = router