import pg from "pg";
import db from "../db.js";

const getAllUsers =  async (req, res) => {
    try{
        const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
        const result = await db.query("SELECT * FROM users ORDER by created_at DESC LIMIT $1 OFFSET $2",[limit,offset]);
        const users = result.rows;
        res.json(users);
    }catch(err){
        console.error("Error getting users", err);
        res.status(500).json({ error: "Failed to fetch users" });

    }
}
const getUser = async (req, res) => {
    const user_id = Number(req.params.user_id);
    if(!user_id){
        return res.status(400).json({error: "user id is required"});
    }
    try{
        const result = await db.query("SELECT * FROM users where id = ($1)",[user_id]);
        if (result.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
    }
        const user = result.rows[0];
        res.json(user);
    }catch(err){
        console.error("Error getting user", err);
    }
}
const uploadProfilePic = async (req, res) => {
    const imageURL = req.file.path;
    const userId = req.body.userId;
    if (!imageURL || !userId) {
  return res.status(400).json({ error: "Image file and userId are required" });
}
    
     await db.query("UPDATE users SET profile_picture = $1 WHERE id = $2", [imageURL, userId]);

  res.json({ success: true, imageURL });
}
 const searchUsers = async (req, res) => {
    try{
    //Want to create a limit later
  //  const limit = parseInt(req.query.limit) || 12;
   // const offset = parseInt(req.query.offset) || 0;
   const name = req.params.name;
    const result = await db.query("SELECT * FROM users WHERE username ILIKE $1",[`%${name}%`]);
    const users = result.rows;
    res.json(users);
    }catch(err){
        console.error("error getting users", err);
    }
  }
  const getFollowerUsers = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty 'ids' array" });
    }

    const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
    const query = `SELECT * FROM users WHERE id IN (${placeholders})`;
    const result = await db.query(query, ids);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching following challenges:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export {getAllUsers, getUser, uploadProfilePic,searchUsers, getFollowerUsers}