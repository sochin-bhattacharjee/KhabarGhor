import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"

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

        // mobile number validation
        if (mobile.length < 11 || mobile.length > 11) {
            return res.status(400).json({message:"Mobile number is wrong"})
        }

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