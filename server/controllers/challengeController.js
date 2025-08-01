import pg from "pg";
import db from "../db.js";
import { generateChallengeWithGroq } from "../groqService.js";
const getAllChallenges = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  try{
  const result = await db.query(`SELECT * FROM challenges ORDER by created_at DESC LIMIT $1 OFFSET $2`,[limit,offset]);
  const challenges = result.rows;
  res.json(challenges);
  }catch(err){
    console.log("Error fetching challenges:",err);
    res.status(500).json({error: "Server error"});
  }
};
const getFollowerChallenges = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty 'ids' array" });
    }

    const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
    const query = `SELECT * FROM challenges WHERE user_id IN (${placeholders})`;
    const result = await db.query(query, ids);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching following challenges:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserChallenges = async (req, res) => {
    const user_id = Number(req.params.user_id);
    if(!user_id){
        return res.status(400).json({error: "user id is required"});
    }
    try{
        const result = await db.query("SELECT * FROM challenges where user_id = ($1)",[user_id]);
        const userChallenges = result.rows;
        res.json(userChallenges);
    }catch(err){
        console.error("Error getting challenge", err);
    }
}
const getMostRecentChallenge = async (req, res) => {
  const user_id = Number(req.params.user_id);
  if(!user_id){
    return res.status(400).json({error: "user id is required"});
  }
  try{
     const result = await db.query(
      "SELECT * FROM challenges WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1",
      [user_id]
    );
    res.json(result.rows[0]);
  }catch(err){
    console.error("Error fetching challenge:", err);
  }
}
const createChallenge =  async (req, res) => {
  const { prompt, type } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  if(!type){
    return res.status(400).json({error: "Selection is required" })
  }
  try{
    console.log(req.user.id);
    const  userId  = Number(req.user.id);
    if(!userId){
        return res.status(400).json({error: "User ID is required"});
    }
    if(type === "custom"){
      const result  = await db.query("INSERT INTO challenges (user_id, prompt) VALUES ($1,$2) RETURNING *",[userId,prompt]);
    const newChallenge = result.rows[0];
    res.status(201).json(newChallenge);
    }else{
      let aiPrompt = await generateChallengeWithGroq(prompt);
       const result  = await db.query("INSERT INTO challenges (user_id, prompt) VALUES ($1,$2) RETURNING *",[userId,aiPrompt]);
      const newChallenge = result.rows[0];
      res.status(201).json(newChallenge);
    }
  }catch(err){
    console.error("Error creating new challenge", err);
  }
 
  
};

export { getAllChallenges, createChallenge, getUserChallenges, getMostRecentChallenge,getFollowerChallenges };
