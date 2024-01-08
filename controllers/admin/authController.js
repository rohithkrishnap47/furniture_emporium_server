const authmodel = require('../../models/authModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const generateOTP = require('../../utils/generateOTP')
const nodemailer = require('../../utils/mailer');
const adminModal = require('../../models/adminModel');
const Cookies = require('js-cookie');
const SuperAdmin = require('../../models/authModal');
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
        const token = jwt.sign({ id: user._id }, process.env.USER_TOKEN_JWT_SECRET, { expiresIn: '10h' });
        const userInfo = {
            firstname: user.firstname,
            lastname: user.lastname,
            emailaddress: user.emailaddress

        }
        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
        }).status(200).json({ message: "Login successful", token, userInfo, statusCode: 200 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const registerUser = async (req, res) => {
    try {
        const { emailaddress, password, firstname, lastname } = req.body;
        if (!emailaddress || !password || !firstname || !lastname) {
            return res.status(400).json({
                statusCode: 400,
                message: "feilds missing"
            });
        }
        const existingUser = await authmodel.findOne({ emailaddress });
        if (existingUser) {
            return res.status(400).json({
                statusCode: 400,
                message: "user already exists"
            });

        }
        const newUser = new authmodel({
            emailaddress,
            password: await bcrypt.hash(password, 10),
            firstname,
            lastname
        });
        await newUser.save();
        return res.status(201).json({ message: "user created successfully", statusCode: 201 })
    } catch (error) {
        console.log(error);
        console.error(error);
    }
}

// GET-USER-(newly done)
const getUserById = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await authmodel.findById({ userId });

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: "User not found"
            });
        }
        return res.status(200).json({
            statusCode:200,
            message:"user found",
            data:user
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
    }
}

// FORGOT-PASSWORD
const forgotpassword = async (req, res) => {
    try {
        const emailaddress = req.body.email
        const checkuser = await authmodel.findOne({ emailaddress });
        console.log("checkuser", checkuser);

        if (!checkuser) {
            return res.status(400).json({
                statusCode: 400,
                message: "NO USER FOUND WITH THIS MAIL ID"
            });
        }
        const OTP = generateOTP.generateOTP()
        await authmodel.findOneAndUpdate(
            { emailaddress },
            { $set: { otp: OTP } },
            { new: true }
        );
        nodemailer.sentOTP(emailaddress, OTP)
        return res.status(200).json({
            statusCode: 400,
            message: "Please Check your mail"

        });

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
}
// OTP-VERIFICATION
const otpverification = async (req, res) => {
    try {
        const emailaddress = req.body.userEmail;
        const otp = req.body.otp;

        const user = await authmodel.findOne({ emailaddress });

        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid email address"
            });
        }
        if (user.otp == otp) {
            return res.status(200).json({
                statusCode: 200,
                message: "OTP verified",
                email: user.emailaddress,
            })
        }
        else {
            return res.status(400).json({
                statusCode: 400,
                message: "enter valid otp"
            })
        }

    }
    catch (error) {
        console.log(error);
    }
}
// RESET-PASSWORD
const resetPassword = async (req, res) => {
    try {
        const emailaddress = req.body.Email;
        const password = req.body.password;

        const user = await authmodel.findOne({ emailaddress });

        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid email address"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password with the hashed password
        await authmodel.findOneAndUpdate(
            { emailaddress },
            { $set: { password: hashedPassword } },
            { new: true }
        );

        return res.status(200).json({
            statusCode: 200,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
};
// ADMIN-LOGIN
const loginAdmin = async (req, res) => {
    try {
        console.log("frtdry");
        const { username, password } = req.body;
        const admin = await adminModal.findOne({ username })
        if (!admin) {
            return res.status(401).json({ message: "Admin Not Found" })
        }
        const checkPassword = await bcrypt.compare(password, admin.password)
        if (!checkPassword) {
            return res.status(401).json({ message: "Wrong password" });
        }
        // jwt tok
        const jwtSecret = 'key';
        const token = jwt.sign({ username: admin.username, role: 'admin' }, jwtSecret, { expiresIn: '1h' });
        Cookies.set('token', token, { expires: 1 / 24 });
        const adminInfo = {
            name: admin.name,
            username: admin.username,

        }
        Cookies.set('adminInfo', JSON.stringify(adminInfo), { expires: 1 / 24 });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




module.exports = { loginUser, loginAdmin, registerUser, forgotpassword, resetPassword, otpverification, getUserById };