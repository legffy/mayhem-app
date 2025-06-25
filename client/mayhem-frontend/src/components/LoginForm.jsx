import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import GoogleButton from "./GoogleButton";

function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    const { email, password } = user;
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      navigate("/home");
      setLoading(false);
    } catch (err) {
      setLoading(false)
      console.error("Login error:", err);
    }finally{
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  return (
    <form action="" className="flex flex-col p-4 text-base space-y-4">
      <label htmlFor="">Email</label>
      <input
        className="focus:ring-1 focus:outline-none p-5"
        style={{ outline: "2px solid #003554" }}
        type="email"
        name="email"
        id=""
        placeholder="youremail@x.com"
        required
        onChange={handleChange}
      />
      <label htmlFor="">Password</label>
      <input
        className="focus:ring-1 focus:outline-none p-5"
        style={{ outline: "2px solid #003554" }}
        type="password"
        name="password"
        id=""
        placeholder="........."
        required
        onChange={handleChange}
      />
      <Login bWidth="350" handleLogin={handleLogin} loading = {loading} />
      <GoogleButton handleGoogleLogin={handleGoogleLogin} />
    </form>
  );
}
export default LoginForm;
