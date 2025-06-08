// utils/cloudinary.js
const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "your_folder_name", // Optional: Set a specific folder in Cloudinary
    format: async (req, file) => ["jpg", "png"], // Optional: Set the file format
    public_id: (req, file) => "custom_filename", // Optional: Set a custom filename
  },
})


const cloudDelete= async(url)=>{
  try {
    const publicId =url?.split("/")[url?.split("/").length - 1]?.split(".")[0]
      const data = await cloudinary.uploader.destroy(publicId);
      return data
    } catch (error) {
      console.log(error)
    }
  
} 

const parser = multer({ storage })




module.exports = {parser ,cloudDelete}
