import express from "express";
import { getAllUsers, getUser, uploadProfilePic} from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { upload } from "../upload.js";
const router = express.Router();
router.get("/",verifyToken, getAllUsers);
router.get("/:user_id",verifyToken, getUser);

router.post("/upload_profile_pic", upload.single("image"), uploadProfilePic);

export default router;
