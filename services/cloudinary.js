const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dhojlp2sf', 
  api_key: '158417472162481', 
  api_secret: 'SpMY8hVL44YbpXuHPbitB6FHbgI' 
});

module.exports = cloudinary