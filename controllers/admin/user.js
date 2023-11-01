const userModal = require("../../models/userModel");
const authModal = require("../../models/authModal");
const bcrypt = require('bcryptjs');


// create user
const registerUser = async (body) => {
    // const requiredFields = ["username", "password", "isEmailverified"];
    // const validationError = bodyRequiredDataValidator = (body, requiredFields);
    // if (validationError) {
    //     return {
    //         statusCode: 400,
    //         error: validationError
    //     };
    // }
    const { username, password, isEmailverified } = body;
    console.log(body);
    try {
        const existingUser=await authModal.findOne({username})
        console.log(existingUser);
        if(existingUser){
            return {
                statusCode: 401,
                message: "User Exists!!!"
            }
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new authModal({
            username: username,
            password: hashedPassword,
            isEmailverified: isEmailverified
        });
        await newUser.save();
        return {
            statusCode: 200,
            message: "new user created"
        };

    }
    catch (error) {
        console.log(error,"hahaahaaa");
        return {
            statusCode: 500,
            message: "internal server error!!!!"
        }
    }

};
// get user by id
const getUserbyId = async (userId) => {
    try {
        const user = await authModal.findById(userId);
        if (!user) {
            return {
                statusCode: 404,
                message: "user not found"
            }

        };
        return {
            statusCode: 200,
            message: "user retrieved succesfully",
            data: user
        };

    }
    catch (error) {
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        }
    }
}

// get all users
const getAllUsers = () => {
    return authModal.find({}).select("-password")//not to show passw 
        .then((users) => {
            return {
                statusCode: 200,
                message: "Users retrieved successfully",
                data: users,
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        });
};


// UPDATE USER

const updateUser = async (userId, body) => {
    const { username, password, isEmailverified } = body;
    try {
        const updatedUser = await authModal.findByIdAndUpdate(userId, {
            username: username,
            password: hashedPassword,
            // isEmailverified:isEmailverified,
        },
            {
                new: true
            }
        );
        if (!updatedUser) {
            return {
                statusCode: 404,
                message: "user is not found",
            };
        }
        return {
            statusCode: 200,
            message: "user found",
            data: updatedUser
        };
    }
    catch(error){
        return{
            statusCode:500,
            message:"internal server error",
            error:error.message,
        };
    }


};

// delete user
const userDelete=async(userId)=>{
    try{
        const deletedUser=await authModal.findByIdAndDelete(userId);
        if (!deletedUser) {
            return{
                statusCode:404,
                message:"user is not found",
            };

        }
        return{
            statusCode:200,
            message:"GOT USER :)"
        };
    }
    catch(error){
        return{
            statusCode:500,
            message:"Internal Server error",
            error:error.message,
        }
    }

}




















//------------------------------------------------------------------------------
const bodyRequiredDataValidator = (body, fields) => {
    let required = []
    fields.forEach((key) => {
        if ([undefined, '', null].includes(body[key])) {
            required.push(key)
        }
    })
    return required.length ? { "missing": required } : undefined
}
//------------------------------------------------------------------------------
module.exports = { getAllUsers,registerUser,updateUser ,getUserbyId,userDelete}