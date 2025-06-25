import React from "react";
import SideBar from "./components/SideBar";
import PromptForm  from "./components/PromptForm";
import ChallengeFeed from "./components/ChallengeFeed";
import UserSuggestions from "./components/UserSuggestions";
function HomePage(){
    return <div className="flex bg-[#F2F4F3]">
        <SideBar/>
        <div className="flex flex-col w-4/6">
            <PromptForm/>
            <ChallengeFeed/>
        </div>
        <UserSuggestions/>
    </div>
}
export default HomePage