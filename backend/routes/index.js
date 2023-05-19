const express = require('express');
const router = express.Router();


const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const categoryRouter = require("./admin/categoryRoute");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);

  
module.exports = router