import React, {useState, useEffect, useSyncExternalStore} from "react";
import ProfilePictureUploader from "./components/ProfilePictureUploader";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

function ProfilePage(){
    const {id } = useParams();
    const nid = Number(id);
    const currentUserId = Number(jwtDecode(localStorage.getItem("token")).id);
    const [user, setUser] = useState({});
    const [challenges, setChallenges] = useState([]);
    const fetchUser = async (userId) => {
    if (!userId) return;
    try {
      const user = await fetch(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await user.json();
      setUser(data);
    } catch (err) {
      console.error("Trouble fetching username:", err);
    }
  };
  const fetchUserChallenges = async (userId) => {
    if(!userId) return;
    try {
      const challenges = await fetch(`http://localhost:3000/api/challenges/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await challenges.json();
      setChallenges((prev) => 
        [...prev, data.prompt]);
    }catch(err){
      console.error("Trouble fetching challenges:", err);
    }
  }
  useEffect(() => {
    fetchUser(nid);
    fetchUserChallenges(nid);
  },[nid]);
   return (
  <div>
   {currentUserId === nid ? <ProfilePictureUploader user_id={nid} />: null}
    <img
      src={user.profile_picture || "/LL-RotR.webp"}
      alt="Profile"
      className="w-20 h-20 rounded-full"
    />
    {challenges.map((challenge, index) => (
      <div key={index}>{challenge}</div>
    ))}
  </div>
);
}
export default ProfilePage;