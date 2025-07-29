'use client'
import Title from "@/components/Title";
import SignUp from "@/components/SignUp";
import Login from "@/components/Login";
import Logo from "@/components/Logo";
function Front(){
    return (
    <div className="min-h-screen bg-[#F2F4F3]">
    <Title/>
    <div className='h-[75vh] flex flex-col items-center justify-center text-gray-300 space-y-12 px-4'>
    <div className='flex space-x-10'>
    <SignUp bWidth ="200" linkTo  = "/signup"/>
    <Login bWidth= "200" linkTo = "/login"/>
    </div>
    <Logo/>
    </div>
    </div> );
}

export default Front;