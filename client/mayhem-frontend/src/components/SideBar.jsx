import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { Home, Search, Sidebar, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
function SideBar(){
	const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/front", { replace: true });
  }
  	const token = localStorage.getItem("token");
	const decoded = jwtDecode(token);
	return <div className = "w-1/6 border-r border-gray-300 text-lg p-4 h-screen flex items-center flex-col">
		<Link to = "/" className="flex py-5">
			<Home className="w-8 h-8"/>
			<span className="pl-4">Home</span>
		</Link>
		<Link to = {`/profile/${decoded.id}`} className="flex  py-5">
			<User className="w-8 h-8"/>
			<span className="pl-4">Profile</span>
		</Link>
		<div className="flex py-5">
			<Search className="w-8 h-8"/>
			<span className="pl-4">Search</span>
		</div>
		<div><button onClick={handleLogout}>Logout</button></div>
	</div>
}
export default SideBar;
