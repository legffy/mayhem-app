"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, Sidebar, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import SearchBar from "./SearchBar";
function SideBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [decoded, setDecoded] = useState(null);
  const [challenge, setChallenge] = useState("");
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/front");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        router.replace("/login");
      }
    }
  }, []);
  useEffect(() => {
    if (decoded) {
      mostRecentChallenge(decoded.id);
    }
  }, [decoded]);
  const mostRecentChallenge = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/challenges/recent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setChallenge(data.prompt);
      console.log(challenge);
    } catch (err) {
      console.error("Failed to load challenges:", err);
    }
  };
  return (
    <div className="w-1/6 border-r border-white text-lg p-4  flex items-center flex-col">
      {showSearch ? (
        <SearchBar />
      ) : (
        <div>
          <Link href="/main" className="flex py-5">
            <Home className="w-8 h-8" />
            <span className="pl-4">Home</span>
          </Link>
          {decoded && (
            <Link href={`/main/profile/${decoded.id}`} className="flex  py-5">
              <User className="w-8 h-8" />
              <span className="pl-4">Profile</span>
            </Link>
          )}
        </div>
      )}
      <div onClick={() => setShowSearch(!showSearch)} className="flex py-5">
        <Search className="w-8 h-8" />
        <span className="pl-4">Search</span>
      </div>
      <div className="rounded-2xl bg-yellow-500 hover:bg-yellow-600 p-2">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="mt-12 mx-2 bg-black shadow-lg shadow-red-700  text-white rounded-xl p-5">
        <h2 className="font-bold">
          Most Recent <span className="text-[#e83131] crimson-glow">Challenge</span>
        </h2>
        <p>{challenge}</p>
      </div>
    </div>
  );
}
export default SideBar;
