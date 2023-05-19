const jwt = require('jsonwebtoken');
const {unAuthorized} = require("../helpers/response");

const verifyToken = (req,res,next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.send(unAuthorized("Token is Required!"));
    }
    token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
        jwt.verify(token, process.env.JWT_SECRETE_KEY, function (err, decoded) {
            //console.log("err",err);
            if (err) return res.send(unAuthorized("Token is Invalid"));
            if (decoded) {
            //console.log(decoded);
            req.user = decoded;
            next();
            }
        });
    } else {
        return res.send(unAuthorized("You are not authnticated"));
    }
       
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      console.log("req.user", req.user.role);
      if (req.user.role === 'admin') {
        next();
        
      } else {
        return res.status(403).json("Only Admin can allow!");
      }
    });
  };

  
const verifyTokenAndUser = (req, res, next) => {
    verifyToken(req, res, () => {
      //console.log("req.user", req.user);
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You are not allow");
      }
    });
  };

module.exports = {verifyToken, verifyTokenAndAdmin, verifyTokenAndUser}