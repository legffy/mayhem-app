import React, { useEffect, useState, useRef, useCallback } from "react";
function ChallengeFeed() {
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [usernames, setUsernames] = useState({});

  const fetchChallenges = async (pageNum) => {
    try {
      const offset = (pageNum-1) * 10;
      const res = await fetch(
        `http://localhost:3000/api/challenges?offset=${offset}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.length === 0) setHasMore(false);
      setChallenges((prev) => [...prev, ...data]);
    } catch (err) {
      console.error("Failed to load challenges:", err);
    }
  };

    const fetchUserName = async (userId) => {
    if (usernames[userId]) return;
    try {
      const user = await fetch(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await user.json();
      setUsernames((prev) => ({...prev, [userId]: data.username}));
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
      if(!usernames[challenge.user_id]){
        fetchUserName(challenge.user_id);
      }
    });
  }, [challenges]);

  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="m-12 text-xl">Challenges</h2>
      {challenges.map((challenge, index) => {
        const isLast = index === challenges.length-1;
       return <div key={challenge.id ?? index} ref = {isLast ? lastChallengeRef : null} className="flex m-12 flex-col">
          <h3>{usernames[challenge.user_id] ?? "Loading user..."}</h3>
          <p>{challenge.prompt}</p>
        </div>
})}
    </div>
  );
}
export default ChallengeFeed;
