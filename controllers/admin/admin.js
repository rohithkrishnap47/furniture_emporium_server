const db = require("../database")
const nodemailer = require('nodemailer');

//------------------------------------------------------------------------------ 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "http://localhost:",
    // port: 5001,
    
    auth: {
        user: 'emporiumfurniture00@gmail.com',
        pass: 'zmix kbda ytdf anvt',
    },
});
//------------------------------------------------------------------------------ 


// ADMIN  
const registerAdmin = async(body) => {
    console.log(body);
    let user=await db.Admin.findOne({ username: body.username })
        // .then((User) => {
            if (user) {
                return {
                    statusCode: 401,
                    message: "ALREADY REGISTERED"
                };
            }
            // else {
                console.log(body, "buhahaaa!!!")
                const newUser = new db.Admin({
                    name: body.name,
                    username: body.username,
                    password: body.password,
                    role: body.role
                });
                let new_user =await newUser.save()
                if (new_user){
                    sentInvitation(body)
                }
               
                return {
                    statusCode: 200,
                    message: "HURRAy!!"
                }
            // }
        // });
}
// NODE mailer function to sent mail;
function sentInvitation(user){
    db.Admin.findOne({ username: user.username })
    .then(user=>{
        console.log(user);
        const mailOptions = {
            from: 'filesrkp@gmail.com',
            to: user.username,
            subject: 'WELCOME TO FURNITURE EMPORIUM',
            text: 'This is a test email sent using ',
            html: `<a href='http://127.0.0.1:5501/set_password.html?id=${user._id}' class='button'>SET PASSWORD</a>`
            
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    })
}





// update
const updateAdmin = (adminId, body) => {
    return db.Admin.findByIdAndUpdate(
        adminId,
        {
            name: body.name,
            username: body.username,
            password: body.password,
            role: body.role
        },
        {
            new: true
        }
    )
        .then((user) => {
            if (!user) {
                return {
                    statusCode: 404,
                    message: "Admin does not exist"
                };
            } else {
                return {
                    statusCode: 200,
                    message: "Admin updated successfully"
                };
            }
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message
            };
        });
};

// ALL_ADMINS
const getAllAdmins = () => {
    return db.Admin.find({})
        .then((admins) => {
            return {
                statusCode: 200,
                message: "Admins retrieved successfully",
                data: admins // Include the retrieved data in the response
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message
            };
        });
};

// DELETE ADMIN
const deleteAdmin = (adminId) => {
    return db.Admin.findByIdAndDelete(adminId)
        .then((admin) => {
            if (!admin) {
                return {
                    statusCode: 404,
                    message: "Admin not found"
                };
            }
            return {
                statusCode: 200,
                message: "Admin deleted successfully"
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message
            };
        });
};

//------------------------------------------------------------------------------




//------------------------------------------------------------------------------ 
module.exports = {
    registerAdmin,
    updateAdmin,
    getAllAdmins,
    deleteAdmin,
};  