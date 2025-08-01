import express from "express";
import { getAllChallenges, createChallenge, getUserChallenges, getMostRecentChallenge,getFollowerChallenges} from "../controllers/challengeController.js";
import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();
router.get("/",verifyToken, getAllChallenges);
router.post("/", verifyToken, createChallenge);
router.get("/:user_id",verifyToken,getUserChallenges);
router.get("/recent/:user_id",verifyToken,getMostRecentChallenge);
router.post("/followers",verifyToken,getFollowerChallenges)

export default router;

