'use client'
import React, { useState} from "react";
import axios from "axios";
import { FileImage } from "lucide-react";

function ProfilePictureUploader(props){
    const [file, setFile] = useState(null);
    async function handleUpload() {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", props.user_id);
        const res = await axios.post("http://localhost:8000/api/user/upload_profile_pic", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("Uploaded image URL:", res.data);    }
          return (
    <div className="flex flex-col">
       <label className="w-64 flex flex-col items-center p-3 bg-red-600 text-white rounded-lg shadow-md tracking-wide uppercase cursor-pointer hover:bg-red-700">
    <span className="mt-2 text-base leading-normal flex items-center">Select a file <FileImage /></span>
    <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
  </label>

  <button
    onClick={handleUpload}
    className="bg-yellow-500 mt-2 hover:bg-yellow-600 text-white font-semibold p-3 rounded-lg shadow-md transition duration-200"
  >
    Upload
  </button>
    </div>
  );
}
export default ProfilePictureUploader;