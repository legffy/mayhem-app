import pg from "pg";
import db from "../db.js";
const getAllChallenges = async (req, res) => {
  const result = await db.query(`SELECT * FROM challenges`);
  const challenges = result.rows;
  res.json(challenges);
};
const getUserChallenges = async (req, res) => {
    const  {id} = req.body;
    if(!id){
        return res.status(400).json({error: "user id is required"});
    }
    try{
        const result = await db.query("SELECT * FROM challenges where user_id = ($1)",[id]);
        const userChallenges = result.rows;
        res.json(userChallenge);
    }catch(err){
        console.error("Error getting challenge", err);
    }
}
const createChallenge =  async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  try{
    const { userId } = req.body;
    if(!userId){
        return res.status(400).json({error: "User ID is required"});
    }
    const result  = await db.query("INSERT INTO challenges (user_id, prompt) VALUES ($1,$2) RETURNING *",[userId,prompt]);
    const newChallenge = result.rows[0];
    res.status(201).json(newChallenge);
  }catch(err){
    console.error("Error creating new challenge", err);
  }
  
  
};

export { getAllChallenges, createChallenge };
