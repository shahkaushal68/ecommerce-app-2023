const mongoose =  require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    shipping:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true,
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;