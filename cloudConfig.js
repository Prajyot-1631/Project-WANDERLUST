// TELLING OUR CODE HOW TO ACCESS CLOUDINARY ACCOUNT
// accessing the account before uploading the file

// REQUIRE
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// CONFIG:configuration details
// connecting backend to cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,    //info stored inside our .env file
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Defining our storage 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png","jpg","jpeg"]
  },
});


module.exports = {
  cloudinary,
  storage,
};