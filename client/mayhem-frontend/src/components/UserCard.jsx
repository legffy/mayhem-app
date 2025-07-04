import React, {use, useState} from "react";
import { Link, useNavigate} from "react-router-dom";
function UserCard(props) {
 
  return (
    <div className="flex ml-5  mt-5">
      <img
      src={props.profile_picture || "/LL-RotR.webp"}
        alt=""
        className="w-10 h-10 mr-2 rounded-full object-cover"
      />
      <Link to={`/profile/${props.userId}`} className="mr-2">{props.username}</Link>
      Follow
    </div>
  );
}
export default UserCard;
