import express from "express";
import { getUserFollowers, followUser } from "../controllers/followerController.js";
import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();
router.get("/:user_id",verifyToken, getUserFollowers);
router.post("/:follower/:followed", verifyToken, followUser);


export default router;

