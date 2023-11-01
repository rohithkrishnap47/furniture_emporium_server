// const { response } = require('express');
// const adminModal = require("../../models/adminModel");

// const login=async(body)=>{
  
//   console.log(body);
//   const username1=body.username.trim()
//   //console.log("greb", username1);
//  // const password=body.password
//   try{
//   const user = await adminModal.findOne({username:username1});
//   console.log("vv",user);
//         if (user) {
//           return{
//             statusCode: 200,
//             message: 'Login successful',
//             data: user,
//           };
//         } else {
//           return{
//             statusCode: 401,
//             message: 'Invalid credentials',
//           };
//         }
//       } catch (error) {
//         return{
//           statusCode: 500,
//           message: 'Internal Server Error',
//           error: error.message,
//         };
//       }

// }

// module.exports={login}










// // app.post('/login', async (req, res) => {
// //     const { username, password } = req.body;
  
// //     try {
// //       const user = await User.findOne({ username, password });
  
// //       if (user) {
// //         res.status(200).json({
// //           statusCode: 200,
// //           message: 'Login successful',
// //           data: user,
// //         });
// //       } else {
// //         res.status(401).json({
// //           statusCode: 401,
// //           message: 'Invalid credentials',
// //         });
// //       }
// //     } catch (error) {
// //       res.status(500).json({
// //         statusCode: 500,
// //         message: 'Internal Server Error',
// //         error: error.message,
// //       });
// //     }
// //   });
  