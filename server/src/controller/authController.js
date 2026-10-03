const mongoose = require("mongoose");
const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail.utils.js");
const jwt = require("jsonwebtoken");

const genToken = (id) => {
    return jwt.sign({ id }, process.env.jwt_secret , {expiresIn: "7d"})
}

// 1. Register a User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = User.findOne({ email });
        if(existingUser)
            return res.status(400).json({ success: false , message: "User Already Exist" });

        const salt = bcrypt.genSalt(process.env.SALT);
        const hashedPass = bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPass });
        if(user){
            const otp = Math.floor(100000 + Math.random() * 900000);
            const message = `Welcome to YellowCart, ${name}!\n Here's your OTP ${otp}\n Please Do not share this.`
            const subject = `Welcome to YellowCart, ${name}! Here's your OTP for Registration`;
            await sendMail(email, subject, message);

            const token = genToken(user._id);
            res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});          
            return res.status(201).json({ success: true, message: "User Created Successfully!~ Please check your mail", user: { email: email, name: user.name }});
        } else {
            res.status(400).json({ success: false, message: `User creation Failed!! ${error.message}`})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Unknown Error while User Creation"})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = User.findOne({ email });
        if(user && bcrypt.compare(password, user.password)){
            const token = genToken(user._id);
            res.cookie('token', token , { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            return res.status(201).json({ success: true, message: "User Login Successfully!~", user: { email: email, name: user.name }});
        } else {
            return res.status(400).json({ success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: `Unknown Error while Login ${error.message}`})
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true });
        return res.status(201).json({ success: true, message: "Logout success"});
    } catch (error) {
        return res.status(500).json({ success: false, message: `Logout Failed ${error.message}`})
    }
}

module.exports = { registerUser, loginUser, logoutUser };














