import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { jwtDecode } from "jwt-decode";

function UserSuggestions(){
     const [users,setUsers] = useState([]);
     const [following, setFollowing] = useState([]);
     const [decoded, setDecoded] = useState(null);
    useEffect(() => {
       const token = localStorage.getItem("token");
       if (token) {
         try {
           const decodedToken = jwtDecode(token);
           setDecoded(decodedToken);
         } catch (err) {
           console.error("Invalid token", err);
           localStorage.removeItem("token");
           router.replace("/login");
         }
       }
     }, []);
     useEffect(() => {
       if (decoded) {
         fetchFollowing(decoded.id);
       }
     }, [decoded]);
  
  const fetchUsers = async (pageNum) => {
    try{
      const offset = (pageNum-1) *12;
     const res = await fetch(
        `http://localhost:8000/api/user?offset=${offset}&limit=12`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setUsers((prev) => [...prev,...data]);
  }catch(err){
    console.error("Failed to load users:", err);
  }}
  const fetchFollowing = async (id) => {
    try{
      const res = await fetch(`http://localhost:8000/api/follower/${id}`,
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setFollowing((prev) => [...prev,...data]);
    }catch(err){
      console.error("Failed to load following:", err);
    }
  }
  const handleFollow = async (urId,thereId) => {
    const other = Number(thereId);
    const you = Number(urId);
    try{
      const res = await fetch(`http://localhost:8000/api/follower/${you}/${other}`,
      {
        method: "POST",
        headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      )
      console.log(res);
    }catch(err){
      console.error("problem with following",err);
    }
  }
  useEffect(() => {
    fetchUsers(1);
  },[]);
    return <div className="w-1/6">{users.map((user, index) =>  { return <UserCard key = {index} thereId = {decoded.id} username = {user.username} profile_picture = {user.profile_picture} userId = {user.id} following = {following.some( f => f.followed_id === user.id)} handleFollow = {handleFollow}/>})}</div>
}
export default UserSuggestions;