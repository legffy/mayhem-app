import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

function UserSuggestions(){
     const [users,setUsers] = useState([]);
  const fetchUsers = async (pageNum) => {
    try{
      const offset = (pageNum-1) *12;
     const res = await fetch(
        `http://localhost:3000/api/user?offset=${offset}&limit=12`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      
      setUsers((prev) => [...prev,...data]);
  }catch(err){
    console.error("Failed to load users:", err);
  }}
  useEffect(() => {
    fetchUsers(1);
  },[]);
    return <div className="w-1/6 border-l border-gray-300">{users.map((user, index) =>  { return <UserCard key = {index} username = {user.username} profile_picture = {user.profile_picture} userId = {user.id}/>})}</div>
}
export default UserSuggestions;