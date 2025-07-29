import express from "express";
import { getAllUsers, getUser, uploadProfilePic, searchUsers,getFollowerUsers} from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { upload } from "../upload.js";
const router = express.Router();
router.get("/",verifyToken, getAllUsers);
router.get("/:user_id",verifyToken, getUser);
router.get("/search/:name",searchUsers);
router.post("/upload_profile_pic", upload.single("image"), uploadProfilePic);
router.post("/followers",verifyToken,getFollowerUsers);

export default router;
