import React, {useState, useEffect} from "react";
import ProfilePictureUploader from "./components/ProfilePictureUploader";
import { jwtDecode } from "jwt-decode";

function ProfilePage(){
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const [user, setUser] = useState({});
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
  useEffect(() => {
    console.log(decoded.id);
    fetchUser(decoded.id);
  },[]);
    return <div><ProfilePictureUploader user_id = {decoded.id}/>
            <img
  src={user.profile_picture || "/LL-RotR.webp"}
  alt="Profile"
  className="w-20 h-20 rounded-full"
/> {user.id} hello
             </div>
}
export default ProfilePage;