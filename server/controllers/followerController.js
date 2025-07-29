import pg from "pg";
import db from "../db.js";

const getUserFollowers =  async (req, res) => {
    try{
        const user_id = Number(req.params.user_id);
        const result = await db.query("SELECT * FROM followers WHERE follower_id = ($1) ",[user_id]);
        const users = result.rows;
        res.json(users);
    }catch(err){
        console.error("Error getting followers", err);
        res.status(500).json({ error: "Failed to fetch followers" });

    }
}

const followUser = async (req, res) => {
    try{
        const follower_id = Number(req.params.follower);
        const followe_id = Number(req.params.followed);
        const result = await db.query("INSERT INTO followers (follower_id, followed_id) VALUES ($1,$2) RETURNING *",[follower_id,followe_id]);
        const followers= result.rows[0];
        res.status(201).json(followers);
    }catch(err){
        console.error("Error following user", err);
    }
}
export { getUserFollowers, followUser};