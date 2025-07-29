import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { ArrowUp } from "lucide-react";
function PromptForm() {
  const [challenge, setChallenge]  = useState("");
  const [selected, setSelected] = useState("generate");
  const [submitted, setSubmitted] = useState(false);
  function handleChange(event){
    const value = event.target.value;
    setChallenge(value);
  }
  function handleSelected(event){
    setSelected(event.target.value);
  }
  const challengeSubmit = async (e) =>{
    setSubmitted(true);
    e.preventDefault();
    try{
    const response = await fetch("http://localhost:8000/api/challenges",{method: "Post",headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({prompt: challenge, type: selected}),
    });
    const data = await response.json();
    console.log("Challenge created:", data);
    }catch(err){
      console.error("Error creating challenge", err);
    }finally{
      setSubmitted(false);
    }
  }
  return (
    <div className="w-full bg-[#000000] flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <h1 className="text-6xl  text-white title">Welcome to <span className="text-[#e83131] animate-hue">Mayhem</span> {localStorage.getItem("username")} </h1>
        <Logo /> 
      </div>
     { !submitted ? <div> <p className="text-2xl text-center mt-8 mb-12 animate-hue">
        Enter your own challenge below or generate a challenge with a prompt
      </p>
      <form className="flex flex-col items-center text-white p-8 rounded-full" action="">
        <div className="mb-4">
            <input
    type="radio"
    name="challengeType"
    id="generate"
    value="generate"
    className="hidden"
    onChange={handleSelected} // optional state handler
    checked={selected === "generate"}
  />
          <label className={`mx-3 p-3 rounded-lg cursor-pointer ${
    selected === "generate"  ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-[#414141] hover:bg-[#313131] text-white"
  }`} htmlFor="generate">Generate Prompt</label>
            <input
    type="radio"
    name="challengeType"
    id="custom"
    value="custom"
    className="hidden"
    onChange={handleSelected} // optional state handler
    checked={selected === "custom"}
  />
          <label className={`mx-3 p-3 rounded-lg cursor-pointer ${
    selected === "custom" ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-[#414141] hover:bg-[#313131] text-white"
  }`} htmlFor="custom">Create Your Own</label>
        </div>
      <div className="bg-white w-full max-w-xl rounded-2xl mt-3 p-5 text-black">
        <div className="flex items-end gap-2">
        <textarea placeholder="enter challenge here" className="flex-grow bg-[#ffffff] border-0 border-none focus:outline-none focus:ring-0  mb-5  p-4 pr-12 w-full resize-none" name="" id="" onChange={handleChange}></textarea>
        <button className=" bg-black hover:bg-slate-800 p-2 rounded-full " onClick = {challengeSubmit}><ArrowUp color="white"/></button>
        </div>
        </div>
      </form> </div> : <p className="flex justify-center items-center animate-hue text-xl">submitting</p>}
    </div>
  );
}
export default PromptForm;
