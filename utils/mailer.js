const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "http://localhost:",
    // port: 5001,

    auth: {
        user: 'emporiumfurniture00@gmail.com',
        pass: 'zmix kbda ytdf anvt',
    },
});

const sentOTP = (email, otp) => {
    const mailOptions = {
        from: 'filesrkp@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: `Dear User,\n\n`
            + `You have requested to reset your password. Please use the following OTP (One-Time Password) to proceed with the password reset process:\n\n`
            + `OTP: ${otp}\n\n`

    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

const sendLoginConfirmationEmail = (email) => {
    const mailOptions = {
        from: 'filesrkp@gmail.com',
        to: email,
        subject: 'Login Confirmation - Welcome to Furniture Emporium',
        text: `Dear User,\n\n`
            + `You have been successfully logged into Furniture Emporium.\n\n`
            + `We're thrilled to have you with us! Feel free to explore our latest collections and enjoy a seamless shopping experience.\n\n`
            + `Have a great day!\n\n`
            + `Best regards,\n`
            + `The Furniture Emporium Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = { sentOTP ,sendLoginConfirmationEmail}