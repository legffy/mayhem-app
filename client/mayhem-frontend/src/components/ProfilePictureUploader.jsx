import React, { useState} from "react";
import axios from "axios";

function ProfilePictureUploader(props){
    const [file, setFile] = useState(null);
    async function handleUpload() {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", props.user_id);
        const res = await axios.post("http://localhost:3000/api/user/upload_profile_pic", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("Uploaded image URL:", res.data);    }
          return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
export default ProfilePictureUploader;