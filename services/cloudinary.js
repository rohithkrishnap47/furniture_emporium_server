// const cloudinary = require("cloudinary").v2
          
// cloudinary.config({ 
//   cloud_name: 'dhojlp2sf', 
//   api_key: '158417472162481', 
//   api_secret: 'SpMY8hVL44YbpXuHPbitB6FHbgI' 
// });

// module.exports = cloudinary



// ----------------------------------------------------------------------------
// require('dotenv').config()
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: dhojlp2sf,//process.env.CLOUDINARY_CLOUD_NAME
//   api_key: 158417472162481,//process.env.CLOUDINARY_API_KEY
//   api_secret: SpMY8hVL44YbpXuHPbitB6FHbgI,//process.env.CLOUDINARY_API_SECRET
// });

// const images = [
//   './images/dining.jpg'
// ];

// (async function run() {
//   for ( const image of images ) {
//     const result = await cloudinary.uploader.upload(image);
//     console.log(`Successfully uploaded ${image}`);
//     console.log(`> Result: ${result.secure_url}`);
//   }
// })();