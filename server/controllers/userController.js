import pg from "pg";
import db from "../db.js";

const getAllUsers =  async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM users");
        const users = result.rows;
        res.json(users);
    }catch(err){
        console.error("Error getting challenge", err);
    }
}
const getUserChallenges = async (req, res) => {
    const  {user_id} = req.params;
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

export {getAllUsers, getUserChallenges}