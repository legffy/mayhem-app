import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../db.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);

        let user;
        if (result.rows.length === 0) {
          const insert = await db.query(
            "INSERT INTO users (email,password_hash) VALUES ($1, $2) RETURNING id, email",
            [email, "GOOGLE"]
          );
          user = insert.rows[0];
        } else {
          user = result.rows[0];
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));