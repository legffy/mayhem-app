import React from "react";
import { Link } from "react-router-dom";
function SignUp(props) {
  if(props.handleSignUp){
    return <button
     disabled = {props.loading}
     onClick = {props.handleSignUp}
  className="hover:from-orange-700 hover:to-yellow-600 relative h-[48px] bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg overflow-hidden flex items-center justify-center "
  style={{ width: `${props.bWidth}px` }}
>      <span className="relative z-10">Sign Up</span>
      <span className="absolute inset-0 bg-white opacity-10 rounded-full blur-xl z-0"></span>
    </button>
  }
  return (
<Link  to={props.linkTo} disabled = {props.loading}
  className="hover:from-orange-700 hover:to-yellow-600 relative h-[48px] bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg overflow-hidden flex items-center justify-center "
  style={{ width: `${props.bWidth}px` }}
>      <span className="relative z-10">Sign Up</span>
      <span className="absolute inset-0 bg-white opacity-10 rounded-full blur-xl z-0"></span>
    </Link>
  );
}
export default SignUp;
