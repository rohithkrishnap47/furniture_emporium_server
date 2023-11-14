const nodemailer=require("nodemailer")
const adminModal = require("../../models/adminModel");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "http://localhost:",
    // port: 5001,

    auth: {
        user: 'emporiumfurniture00@gmail.com',
        pass: 'zmix kbda ytdf anvt',
    },
});

const sentOTP=(email,otp)=> {
            const mailOptions = {
                from: 'filesrkp@gmail.com',
                to: email,
                subject: 'Reset Password',
                text: otp,
                // html: `<a href='http://127.0.0.1:5501/set_password.html?id=${user._id}' class='button'>SET PASSWORD</a>`


            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }
module.exports={sentOTP}