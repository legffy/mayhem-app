import React from "react";
function GoogleButton(props){
    return <button
          onClick = {props.handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 border border-[#9AA0A8] rounded-full hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm text-[#003554] font-medium">Sign in with Google</span>
        </button>
}
export default GoogleButton;