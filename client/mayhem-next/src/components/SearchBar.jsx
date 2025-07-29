import React,{useState, useEffect} from "react";
import Link from "next/link";
function SearchBar(){
    const [search, setSearch] = useState("");
    const [searchs, setSearchs] = useState([]);
    const searchUsers = async (search) => {
    if(!search) return;
    console.log(localStorage.getItem("token"));
    try {
      const users = await fetch(`http://localhost:8000/api/user/search/${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await users.json();
      setSearchs(data);
    }catch(err){
      console.error("Trouble fetching challenges:", err);
    }
  }
  useEffect(()=> {
    searchUsers(search);
  },[search])
 return (
    <div className="bg-white p-2">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="bg-white m-2 text-black focus:outline-none focus:ring-0 p-2 border-b-black border-2"
      />
      {searchs.map((user, index) => (
        <Link href = {`/main/profile/${user.id}`}key={index} className=" text-black flex items-center mb-2">
          <img
            src={user.profile_picture || "/LL-RotR.webp"}
            alt=""
            className="w-10 h-10 mr-2 rounded-full object-cover"
          />
          <span>{user.username}</span>
        </Link>
      ))}
    </div>
  );
}
export default SearchBar;