const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path;
      //console.log("file", file);
      if(file.fieldname === "productImage"){
        path = './public/images/product-images';
      }else{
        path = './public/images';
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const fullName =  file.originalname.split(".");
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, fullName[0] + '-' + uniqueSuffix + "." + fullName[1]);
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}    
  
const upload = multer({ storage: storage, fileFilter:imageFilter });

module.exports = upload;