const authmodel = require('../../models/authModal');
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

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

module.exports=loginUser;