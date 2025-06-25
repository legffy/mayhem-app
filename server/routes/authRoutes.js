import express from "express";
import { signup, login } from "../controllers/authController.js";
import passport from "passport";
import jwt from "jsonwebtoken";
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/"}),
(req,res) =>{
    const token  = jwt.sign({id : req.user.id}, JWT_SECRET, {expiresIn: "7d"});
    const username = req.user.username;
res.redirect(`http://localhost:5173/auth/google/success?token=${token}&username=${encodeURIComponent(username)}`);
});
router.post("/signup", signup);
router.post("/login", login);

export default router;