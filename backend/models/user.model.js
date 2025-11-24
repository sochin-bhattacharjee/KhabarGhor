import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String
    },
    mobile : {
        type : Number,
        require : true
    },
    role : {
        type : String,
        enum : ["user","owner","deliveryBoy"],
        require : true
    },
    resetOtp: {
        type:String
    },
    isOtpVerified: {
        type:Boolean,
        default:false
    },
    otpExpires: {
        type:Date
    }
},{timestamps:true})

const User = mongoose.model("user", userSchema)
export default User;