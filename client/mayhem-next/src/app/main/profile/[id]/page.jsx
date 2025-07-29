"use client";
import React, { useState, useEffect, use } from "react";
import ProfilePictureUploader from "@/components/ProfilePictureUploader";
import { jwtDecode } from "jwt-decode";
import { useParams } from "next/navigation";
import { ClipboardSignature } from "lucide-react";

function ProfilePage(props) {
  const { id } = use(props.params);
  const nid = Number(id);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [user, setUser] = useState({});
  const [challenges, setChallenges] = useState([]);
  const [followerChallenges, setFollowerChallenges] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const fetchUser = async (userId) => {
    if (!userId) return;
    try {
      const user = await fetch(`http://localhost:8000/api/user/${userId}`, {
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
  const fetchFollowing = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/follower/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const allData = await res.json();
      const data = allData.map((f) => f.followed_id);
      console.log(data);
      setFollowing((prev) => [...prev, ...data]);
      fetchFollowingChallenges(data);
      fetchFollowingUsers(data);
    } catch (err) {
      console.error("Failed to load following:", err);
    }
  };
  const fetchUserChallenges = async (userId) => {
    if (!userId) return;
    try {
      const challenges = await fetch(
        `http://localhost:8000/api/challenges/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await challenges.json();
      setChallenges(data);
    } catch (err) {
      console.error("Trouble fetching challenges:", err);
    }
  };
  const fetchFollowingChallenges = async (following) => {
if (!Array.isArray(following) || following.length === 0) return;
    try {
      const followerChallenges = await fetch(
        `http://localhost:8000/api/challenges/followers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ids: following }),
        }
      );
      const data = await followerChallenges.json();
      setFollowerChallenges(data);

      console.log(data);
    } catch (err) {
      console.error("Trouble fetching follower challenges", err);
    }
  };
   const fetchFollowingUsers = async (following) => {
    if (!Array.isArray(following) || following.length === 0) return;
    try {
      const followerUsers = await fetch(
        `http://localhost:8000/api/user/followers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ids: following }),
        }
      );
      const data = await followerUsers.json();
      setFollowingUsers(data);
      console.log(data);
    } catch (err) {
      console.error("Trouble fetching follower challenges", err);
    }
  };
  useEffect(() => {
    setCurrentUserId(Number(jwtDecode(localStorage.getItem("token")).id));
    fetchUser(nid);
    fetchUserChallenges(nid);
    fetchFollowing(nid);
  }, [nid]);
  return (
    <div className="flex flex-col items-center justify-center m-8 text-lg ">
      <div className="flex items-center space-x-5 m-5">
        <div className="">
          <img
            src={user.profile_picture || "/LL-RotR.webp"}
            alt="Profile"
            className="h-48 w-48 rounded-full object-cover"
          />{" "}
        </div>{" "}
        {currentUserId === nid ? (
          <ProfilePictureUploader user_id={nid} />
        ) : null}{" "}
      </div>
      <div className="flex justify-between w-full">
        {currentUserId === nid ? (
          <div className="text-xl flex-1">
            Your <span className="text-[#e83131] animate-hue">Challenges:</span>
          </div>
        ) : (
          <div className="flex-1">
            {user.username}'s{" "}
            <span className="text-[#e83131] animate-hue">challenges</span>
          </div>
        )}
        <div className="flex-1">
          Followings{" "}
          <span className="text-[#e83131] animate-hue">Challenges:</span>{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex w-full items-start text-left">
        <div className="flex-1 w-full">
          {" "}
          {challenges
            .slice()
            .reverse()
            .map((challenge, index) => (
              <div className="text-left my-3" key={index}>
                {challenge.prompt}
              </div>
            ))}{" "}
        </div>
        <div className="flex-1 w-full">
          {" "}
       {  followerChallenges ?(followerChallenges.slice().reverse().map((challenge, index) => { const follower = followingUsers.find((u) => u.id === challenge.user_id); return (
              <div className="text-left my-3" key={index}>
                <div className="flex flex-col">
                  <h2>{follower ? follower.username : "Unknown user"}</h2>
                  <p>{challenge.prompt}</p>
                </div>
              </div>
            )})): <div>none of your followers have posted</div> }
        </div>{" "}
      </div>
    </div>
  );
}
export default ProfilePage;
