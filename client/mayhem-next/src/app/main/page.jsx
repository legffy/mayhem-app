"use client";
import React, { useState, useEffect } from "react";
import PromptForm from "@/components/PromptForm";
import ChallengeFeed from "@/components/ChallengeFeed";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found. Redirecting...");
        localStorage.removeItem("token");
        router.push("/front");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          console.log("Token is invalid. Redirecting...");
          localStorage.removeItem("token");
          router.push("/front");
          return;
        }

        setIsAuthed(true);
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed:", err);
        router.push("/front");
      }
    };

    checkAuth();
  }, [router]);

  // Block all rendering until check is done
  if (loading || !isAuthed) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <PromptForm />
        <ChallengeFeed />
      </div>
    </div>
  );
}

export default HomePage;