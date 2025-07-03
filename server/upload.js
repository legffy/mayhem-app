import { v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mayhemProfiles",
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

const upload = multer({storage});

export { storage, upload}