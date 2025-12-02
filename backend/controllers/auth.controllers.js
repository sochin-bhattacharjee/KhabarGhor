import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js";

// signUp controller
export const signUp = async (req,res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body
        let user = await User.findOne({email})
        // email validation
        if(user){
            return res.status(400).json({message:"User Already Exist."})
        }
        
        // password validation
        if(password.length<6){
            return res.status(400).json({message:"Please password must be at least 6 characters"})
        }

        // mobile number step by step validation
        // step 1 : mobile number length check
        if (mobile.length < 11 || mobile.length > 11) {
            return res.status(400).json({message:"Mobile number must be exactly 11 digits"})
        }
        // step 2 : digits only check
        if (!/^[0-9]+$/.test(mobile)) {
            return res.status(400).json({message:"Mobile number is must only digit"})
        }
        // step 3 : operator check
        const simOperator = ["013", "014", "015", "016", "017", "018", "019"]
        if (!simOperator.includes(mobile.slice(0,3))) {
            return res.status(400).json({message: "Invalid mobile operator code"})
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure : false,
            sameSite : "strict",
            maxAge : 7*24*60*60*1000,
            httpOnly : true
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(`sign up error - ${error}`)
    }
}

// signIn controller
export const signIn = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        // email validation
        if(!user){
            return res.status(400).json({message:"User Does not Exist."})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect Password"})
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure : false,
            sameSite : "strict",
            maxAge : 7*24*60*60*1000,
            httpOnly : true
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(`sign in error - ${error}`)
    }
}

// // signOut controller
export const signOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"log out successfully"})
    } catch (error) {
        return res.status(500).json(`sign out error - ${error}`)
    }
}

// forgot password controller
export const sendOtp = async (req,res) =>{
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        // check user
        if (!user) {
            return res.status(400).json({message:"User Does not Exist."})
        }
        // create otp
        const otp = Math.floor(1000+Math.random()*900000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now()+5*60*1000
        user.isOtpVerified = false
        await user.save()
        await sendOtpMail(email,otp)
        return res.status(200).json({message:"OTP send successfully"})
    } catch (error) {
        return res.status(500).json(`send OTP error ${error}`)
    }
}

// verify OTP
export const verifyOtp = async (req,res)=>{
    try {
        const {email, otp} = req.body
        const user = await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
            return res.status(400).json({message:"invalid/expired otp"})
        }
        user.isOtpVerified=true
        user.resetOtp=undefined
        user.otpExpires=undefined
        await user.save()
        return res.status(200).json({message:"OTP Verify successfully"})
    } catch (error) {
        return res.status(500).json(`OTP verify error ${error}`)
    }
}

// reset password
export const resetPassword = async (req,res)=>{
    try {
        const {email, newPassword} = req.body
        const user = await User.findOne({email})
        // check user
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({message:"OTP verification required."})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password=hashedPassword
        user.isOtpVerified=false
        await user.save()
        return res.status(200).json({message:"password reset successfully"})
    } catch (error) {
        return res.status(500).json(`Reset password error ${error}`)
    }
}

// Google Authentication
export const googleAuth = async (req, res) => {
    try {
        const {fullName, email, mobile, role} = req.body
        let user = await User.findOne({email})
        if (!user) {
            user= await User.create({
                fullName, email, mobile, role
            })
        }

        // token
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure : false,
            sameSite : "strict",
            maxAge : 7*24*60*60*1000,
            httpOnly : true
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(`Google Auth error ${error}`)
    }
}