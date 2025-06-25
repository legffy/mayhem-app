import React from "react";
import LoginTitle from "./components/LoginTitle";
import LoginForm from "./components/LoginForm";
import SignUpPath from "./components/SignUpPath";
function LoginPage(){
     return (
        <div className = "min-h-screen bg-[#404E4D] flex items-center justify-center">
    <div className="flex  justify-center flex-col space-y-6 rounded-lg shadow-lg bg-white p-8 ">
    <LoginTitle/>
    <LoginForm/>
    <SignUpPath/>
    </div>
</div>
  );
}
export default LoginPage;