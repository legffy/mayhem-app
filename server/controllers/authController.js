import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const { email, password, username }  = req.body;
    
    if(!email || !password)
        return res.status(400).json({ error: "Email and password required"});

    try {
        const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(userCheck.rows.length > 0){
            return res.status(409).json( { error: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const result = await db.query("INSERT INTO users (email, password_hash,username) VALUES ($1,$2,$3) RETURNING id, email, username", [email,hashedPassword,username]);

        const user = result.rows[0];
        const token = jwt.sign({id: user.id}, JWT_SECRET, { expiresIn: "7d"});

        res.status(201).json({token, user});
    }catch(err){
        console.error("Signup error:", err);
        res.status(500).json({error: "Server error"});
    }
 }
 
 const login = async (req, res) => {
    const { email, password} = req.body;
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(result.rows.length == 0){
            return res.status(401).json({ error: "Invalid email or password"});
        }

        const user = result.rows[0];

        const valid = await bcrypt.compare(password, user.password_hash);
        if(!valid) return res.status(401).json({error: "Invalid email or password"});

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "7d"});

        res.json({ token, user: {id: user.id, email: user.email, username: user.username }});
    }catch(err){
        console.error("Login error:", err);
        res.status(500).json({error: "Server error"});
    }
 }
 
 export {signup, login}