import React from "react";
import SideBar from "./components/SideBar";
import PromptForm  from "./components/PromptForm";
import ChallengeFeed from "./components/ChallengeFeed";
import UserSuggestions from "./components/UserSuggestions";
function HomePage(){
    return <div className="">
        <div className="flex flex-col">
            <PromptForm/>
            <ChallengeFeed/>
        </div>

    </div>
}
export default HomePage