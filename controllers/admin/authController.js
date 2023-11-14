const authmodel = require('../../models/authModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const generateOTP=require('../../utils/generateOTP')
const nodemailer = require('../../utils/mailer');

// const { cookie } = require('express-validator');


const loginUser = async (req, res) => {
    
    try {
        const { emailaddress, password } = req.body;
        const user = await authmodel.findOne({ emailaddress });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'newtoken ', { expiresIn: '1h' });
        const userInfo = {
            firstname: user.firstname,
            lastname: user.lastname,
            emailaddress: user.emailaddress

        }
        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
        }).status(200).json({ message: "Login successful", token,userInfo, statusCode:200});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const registerUser = async (req,res) => {
    try {
        const { emailaddress, password, firstname, lastname } = req.body;
        if (!emailaddress || !password || !firstname || !lastname) {
            return res.status(400).json ({
                statusCode: 400,
                message: "feilds missing"
            });
        }
        const existingUser = await authmodel.findOne({ emailaddress });
        if (existingUser) {
            return res.status(400).json ({
                statusCode: 400,
                message: "user already exists"
            });
    
        }
        const newUser=new authmodel({
            emailaddress,
            password:await bcrypt.hash(password,10),
            firstname,
            lastname
        });
        await newUser.save();
        return res.status(201).json({message:"user created successfully",statusCode:201})        
    } catch (error) {
        console.log(error);
        console.error(error);
    }
}

const forgotpassword=async(req,res)=>{
    try {
        const emailaddress=req.body.email
        const checkuser = await authmodel.findOne({ emailaddress });
        if (!checkuser) {
            return res.status(400).json ({
                statusCode: 400,
                message: "NO USER FOUND WITH THIS MAIL ID"
            });
        }
        const OTP=generateOTP.generateOTP()
        let data={
            otp:OTP,
            otp_expiry:new Date
        };


        authmodel.findByIdAndUpdate(checkuser._id, data);
        nodemailer.sentOTP(emailaddress,OTP)
        return res.status(200).json ({
            statusCode: 400,
            message: "Please Check your mail"
        });

    } catch (error) {
        
    }
}


module.exports ={ loginUser,registerUser,forgotpassword};



// ===============================================================DUMP


        // Set the token as an HTTP-only cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     // secure: process.env.NODE_ENV === 'production', /
        //     // maxAge: 3600000 
        // });
        // console.log("cookie",cookie);