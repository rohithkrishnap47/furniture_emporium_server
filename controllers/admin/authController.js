const authmodel = require('../../models/authModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const loginUser = async (body) => {
    const { emailaddress, password } = body;
    try {
        const user = await authmodel.findOne({ username });


        if (!user) {
            return {
                statusCode: 401,
                message: "User not found"
            };
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return {
                statusCode: 401,
                message: "Invalid credentials"
            };
        }
        // const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

        return {
            statusCode: 200,
            message: "Login successful",
            token: token
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: "Internal server error"
        };
    }
}

const registerUser = async (body) => {
    const { emailaddress, password, firstname, lastname } = body;
    if (!emailaddress || !password || !firstname || !lastname) {
        return {
            statusCode: 400,
            message: "feilds missing"
        };
    }
    const existingUser = await authmodel.findOne({ emailaddress });
    if (existingUser) {
        return {
            statusCode: 400,//400 something???
            message: "user already exists"
        };

    }
    const newUser=new authmodel({
        emailaddress,
        password:await bcrypt.hash(password,10),
        firstname,
        lastname
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, 'yourSecretKey', { expiresIn: '24h' });
    
    return{
        statusCode:201,
        message:"user created successfully",
        // token
        data:{
            token:token
        }
    }
}


module.exports = loginUser,registerUser;