'use client'
import SignUpForm from "@/components/SignUpForm";
import SignUpTitle from "@/components/SignUpTitle";
import LoginPath from "@/components/LoginPath";
function SignUpPage(){
    return (
<div className = "min-h-screen bg-[#404E4D] flex items-center justify-center">
    <div className="flex  justify-center flex-col space-y-6 rounded-lg shadow-lg bg-white p-8 ">
    <SignUpTitle/>
    <SignUpForm/>
    <LoginPath/>
    </div>
</div>
  ); 
}
export default SignUpPage;