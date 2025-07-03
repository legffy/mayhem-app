import React, { useEffect, useState } from "react";
import Logo from "./Logo";
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
    const response = await fetch("http://localhost:3000/api/challenges",{method: "Post",headers: {
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
    <div className="w-full">
      <div className="flex w-full items-center justify-center bg-[#404E4D]">
        <h1 className="text-6xl text-white">Welcome to <span className="text-[#C3423F]">Mayhem</span> {localStorage.getItem("username")} </h1>
        <Logo />
      </div>
     { !submitted ? <div> <p className="text-3xl flex justify-center mt-5 mb-8">
        Enter your own challenge below or generate a challenge with a prompt
      </p>
      <form className="flex items-center flex-col justify-center w-full text-white" action="">
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
    selected === "generate"  ? "bg-yellow-500 text-black" : "bg-[#404E4D] text-white"
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
    selected === "custom" ? "bg-yellow-500 text-black" : "bg-[#404E4D] text-white"
  }`} htmlFor="custom">Create Your Own</label>
        </div>
        <textarea className="bg-[#404E4D] p-5 w-3/5 h-22 rounded-2xl" name="" id="" onChange={handleChange}></textarea>
        <button className="bg-[#404E4D] p-3 mt-4 rounded-md resize-none" onClick = {challengeSubmit}>submit</button>
      </form> </div> : <p>submitting</p>}
    </div>
  );
}
export default PromptForm;
