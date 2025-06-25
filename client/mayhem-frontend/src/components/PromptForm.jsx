import React, { useState } from "react";
import Logo from "./Logo";
function PromptForm() {
  const [challenge, setChallenge]  = useState("");
  const [selected, setSelected] = useState("generate");
  function handleChange(event){
    const {value, name} = event.target;
    setChallenge((prev) => {
      return {...prev, [name]: value};
    });
  }
  function handleSelected(event){
    setSelected(event.target.value);
  }
  const challengeSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/challenges",{method: "Post",headers: {

    }})
  }
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center bg-[#404E4D]">
        <h1 className="text-6xl text-[#C3423F]">Mayhem</h1>
        <Logo />
      </div>
      <p className="text-white">Welcome, {localStorage.getItem("username")}!</p>
      <p className="text-3xl flex justify-center mt-5 mb-8">
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
        <textarea className="bg-[#404E4D] p-5 w-3/5 h-22 rounded-2xl" name="" id=""></textarea>
        <button className="bg-[#404E4D] p-3 mt-4 rounded-md resize-none">submit</button>
      </form>
    </div>
  );
}
export default PromptForm;
