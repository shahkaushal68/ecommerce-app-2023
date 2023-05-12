const mongoose =  require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
},
{
    timestamps: true,
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;