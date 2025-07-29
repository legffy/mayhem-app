import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import challengeRoutes from "./routes/challengeRoutes.js"; // NOTE the .js extension in imports for ES modules
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import followerRoutes from "./routes/followerRoutes.js";
import session from "express-session";
import passport from "passport";
import "./config/passportConfig.js"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/challenges", challengeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/follower", followerRoutes);
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
