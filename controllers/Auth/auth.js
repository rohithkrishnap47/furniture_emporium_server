const { response } = require('express');
const adminModal = require("../../models/adminModel");

const login=async(a)=>{
  console.log(a,"ssss");
  const username=a.username
  const password=a.password
  try{
  const user = await adminModal.findOne({ username, password });
  
        if (user) {
          res.status(200).json({
            statusCode: 200,
            message: 'Login successful',
            data: user,
          });
        } else {
          res.status(401).json({
            statusCode: 401,
            message: 'Invalid credentials',
          });
        }
      } catch (error) {
        res.status(500).json({
          statusCode: 500,
          message: 'Internal Server Error',
          error: error.message,
        });
      }

}

module.exports={login}










// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const user = await User.findOne({ username, password });
  
//       if (user) {
//         res.status(200).json({
//           statusCode: 200,
//           message: 'Login successful',
//           data: user,
//         });
//       } else {
//         res.status(401).json({
//           statusCode: 401,
//           message: 'Invalid credentials',
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         statusCode: 500,
//         message: 'Internal Server Error',
//         error: error.message,
//       });
//     }
//   });
  