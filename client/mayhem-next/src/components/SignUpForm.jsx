import React, { useState } from "react";
import SignUp from "@/components/SignUp";
import GoogleButton from "@/components/GoogleButton"
import {useRouter} from "next/navigation";
function SignUpForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setUser((prevValue) => ({
  ...prevValue,
  [name]: value,
}));

  };
  const handleSignUp = async (e) => {
    console.log('ok');
    const { email, password, username } = user;
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,username }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("token", data.token);
      router.push("/main");
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
    }finally{
    setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };
  return (
    <form action="" className="flex flex-col p-4 text-base space-y-4">
       <label htmlFor="">username</label>
      <input
        className="focus:ring-1 focus:outline-none p-5"
        onChange={handleChange}
        style={{ outline: "2px solid #003554" }}
        type="text"
        name="username"
        id=""
        placeholder="Username"
        required
      />
      <label htmlFor="">Email</label>
      <input
        className="focus:ring-1 focus:outline-none p-5"
        onChange={handleChange}
        style={{ outline: "2px solid #003554" }}
        type="email"
        name="email"
        id=""
        placeholder="youremail@x.com"
        required
      />
      <label htmlFor="">Password</label>
      <input
        className="focus:ring-1 focus:outline-none p-5"
        onChange={handleChange}
        style={{ outline: "2px solid #003554" }}
        type="password"
        name="password"
        id=""
        placeholder="........."
        required
      />
      <SignUp bWidth="350" handleSignUp={handleSignUp} loading={loading} />
      <GoogleButton handleGoogleLogin={handleGoogleLogin} />
    </form>
  );
}
export default SignUpForm;
