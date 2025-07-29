"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
function ChallengeFeed() {
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [usernames, setUsernames] = useState({});

  const fetchChallenges = async (pageNum) => {
    try {
      const offset = (pageNum - 1) * 10;
      const res = await fetch(
        `http://localhost:8000/api/challenges?offset=${offset}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.length === 0) setHasMore(false);
      setChallenges((prev) => {
        const newIds = new Set(prev.map((c) => c.id));
        const filtered = data.filter((c) => !newIds.has(c.id));
        return [...prev, ...filtered];
      });
    } catch (err) {
      console.error("Failed to load challenges:", err);
    }
  };

  const fetchUserName = async (userId) => {
    if (usernames[userId]) return;
    try {
      const user = await fetch(`http://localhost:8000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await user.json();
      setUsernames((prev) => ({ ...prev, [userId]: data.username }));
    } catch (err) {
      console.error("Trouble fetching username:", err);
    }
  };
  useEffect(() => {
    fetchChallenges(page);
  }, [page]);

  const lastChallengeRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  useEffect(() => {
    challenges.forEach((challenge) => {
      if (!usernames[challenge.user_id]) {
        fetchUserName(challenge.user_id);
      }
    });
  }, [challenges]);

  return (
    <div className="p-10 flex flex-col">
      <h2 className="m-12 text-3xl text-center  text-[#e83131] crimson-glow">Challenges</h2>
      {challenges.map((challenge, index) => {
        const isLast = index === challenges.length - 1;
        return (
          <div
            key={challenge.id ?? index}
            ref={isLast ? lastChallengeRef : null}
            className="flex m-12 justify-start items-start flex-col"
          >
            <Link className="text-base mb-5 font-bold" href = {`/main/profile/${challenge.user_id}`}>{usernames[challenge.user_id] ?? "Loading user..."}</Link>
            <div className="relative p-1 rounded-2xl shadow-lg shadow-red-700 ">
            <div className=" border-2 border-black p-5 rounded-2xl bg-black">
            <p>{challenge.prompt}</p>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ChallengeFeed;
