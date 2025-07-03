import React from "react";
import {Outlet} from "react-router-dom";
import SideBar from "./components/SideBar";
import UserSuggestions from "./components/UserSuggestions";
const Layout = () => {
    return (<div className="flex bg-[#F2F4F3]">
        <SideBar/>
        <main className="w-4/6">
            <Outlet />
        </main>
                <UserSuggestions/>
    </div>)
}
export default Layout;