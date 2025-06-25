import React from "react";
import { Link } from "react-router-dom";
function Login(props) {
  if (props.handleLogin) {
   return  <button
      className="hover:from-orange-700 hover:to-yellow-600 relative h-[48px] bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg overflow-hidden flex items-center justify-center"
      style={{ width: `${props.bWidth}px` }}
      onClick={props.handleLogin} disabled = {props.loading}
    >
      <span className="relative z-10">Login</span>
      <span className="absolute inset-0 bg-white opacity-10 rounded-full blur-xl z-0"></span>
    </button>;
  }
  return (
    <Link
      to={props.linkTo}
      className="hover:from-orange-700 hover:to-yellow-600 relative h-[48px] bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg overflow-hidden flex items-center justify-center"
      style={{ width: `${props.bWidth}px` }}
    >
      <span className="relative z-10">Login</span>
      <span class="absolute inset-0 bg-white opacity-10 rounded-full blur-xl z-0"></span>
    </Link>
  );
}
export default Login;
