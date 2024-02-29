import { PiTagSimpleFill } from "react-icons/pi";
import { FcSlrBackSide,FcGlobe,FcPortraitMode } from "react-icons/fc";
import "./share.css"
import { useContext, useState } from "react";
import {AuthContext}  from "../../context/AuthContext" ;
import axios from "axios";
import { useRef } from "react";
import { GiCancel } from "react-icons/gi";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  const desc= useRef();
  const [file,setFile] = useState(null);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:8000/api/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
            <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"} alt="img" />
            <input placeholder= {"what's in your mind "+user.username+" ?"}
            className="shareInput"
            ref={desc} />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <GiCancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                   <label htmlFor="file" className="shareOption">
                    {/* <FcSlrBackSide htmlColor="green" className="shareIcon"/> */}
                    <FcSlrBackSide className="shareIcon"/>
                    <span className="shareOptiontext">Photos</span>
                    <input style={{display:"none"}} 
                    type="file" id="file" 
                    accept=".png,.jpeg,.jpg" 
                    onChange={(e)=> setFile(e.target.files[0 ]) }  />
                   </label>
                   <div className="shareOption">
                    <PiTagSimpleFill  className="shareIcon"/>
                    <span className="shareOptiontext">Tags</span>
                   </div>
                   <div className="shareOption">
                    <FcGlobe className="shareIcon"/>
                    <span className="shareOptiontext">Location</span>
                   </div>
                   <div className="shareOption">
                    <FcPortraitMode className="shareIcon"/>
                    <span className="shareOptiontext">Feelings</span>
                   </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}
