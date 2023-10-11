const userModal = require("../../models/userModel");
const bcrypt = require("bcrypt");


// create user
const registerUser = async (body) => {
    const requiredFields = ["username", "password", "isEmailverified"];
    const validationError = bodyRequiredDataValidator = (body, requiredFields);
    if (validationError) {
        return {
            statusCode: 400,
            error: validationError
        };
    }
    const { username, password, isEmailverified } = body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModal({
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
        return {
            statusCode: 500,
            message: "internal server error!!!!"
        }
    }

};
// get user by id
const getUserbyId = async (userId) => {
    try {
        const user = await userModal.findById(userId);
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

// UPDATE USER

const updateUser = async (userId, body) => {
    const { username, password, isEmailverified } = body;
    try {
        const updatedUser = await userModal.findByIdAndUpdate(userId, {
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
        const deletedUser=await userModal.findByIdAndDelete(userId);
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
module.exports = { registerUser,updateUser ,getUserbyId,userDelete}