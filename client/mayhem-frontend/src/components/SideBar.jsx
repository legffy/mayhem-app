import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Sidebar, User } from "lucide-react";
function SideBar(){
	return <div className = "w-1/6 border-r border-gray-300 text-lg p-4 h-screen flex flex-col">
		<div className="flex pl-8 py-5">
			<Home className="w-8 h-8"/>
			<span className="pl-4">Home</span>
		</div>
		<div className="flex pl-8  py-5">
			<User className="w-8 h-8"/>
			<span className="pl-4">Profile</span>
		</div>
		<div className="flex pl-8 py-5">
			<Search className="w-8 h-8"/>
			<span className="pl-4">Search</span>
		</div>
	</div>
}
export default SideBar;
