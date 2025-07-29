import React, {use, useEffect, useState} from "react";
import Link from "next/link";
function UserCard(props) {
  useEffect(() => {
    console.log(props.userId);
  },[]);
  return (
    <div className="flex items-center w-fit  bg-white/90 text-black mt-5 p-2 rounded-xl shadow-md shadow-red-600  ">
      <Link href={`/main/profile/${props.userId}`} className="flex items-center">
      <div className="relative w-12 h-12 mr-2 ">
        <img
      src={props.profile_picture || "/LL-RotR.webp"}
        alt=""
        className="w-full h-full rounded-full object-cover z-10 relative"
      /> </div>
      <div  className="mr-2">{props.username}</div>
      </Link>
      {props.following ? null: <button className="bg-blue-400 rounded-3xl text-white p-2" onClick={()=> props.handleFollow(props.thereId,props.userId)}>Follow</button> } 
    </div>
  );
}
export default UserCard;
