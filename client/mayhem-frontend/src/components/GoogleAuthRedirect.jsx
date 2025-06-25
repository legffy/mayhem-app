import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GoogleAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const username = params.get("username");
   
    if (token) {
      localStorage.setItem("token", token);
       if(username){
      localStorage.setItem("username", username);
      navigate("/home");
    }else{
      console.error("No username found in URL");
      navigate("/login");
    }
    } else {
      console.error("No token found in URL");
      navigate("/login");
    }
  }, [location.search,navigate]);

  return <p className="h-screen flex items-center justify-center text-xl text-gray-700">Logging in with Google...</p>;
}

export default GoogleAuthRedirect;
