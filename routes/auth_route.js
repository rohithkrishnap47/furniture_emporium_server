const express = require('express')
const authController = require('../controllers/admin/authController')
const router = express.Router()

router.post("/login", authController.loginUser)

router.post("/register", authController.registerUser);

module.exports = router 

// (req.body); 
//         res.status(result.statusCode).json(result); 
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             statusCode: 500,
//             message: "Internal Server Error"
//         });
//     }
// }