import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online"
import {Link} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  
  const handlelogout= ()=>{
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:8000/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);


  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8000/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:8000/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

const HomeRightbar = ()=>{
       return (
        <>
            <div className="birthdayContainer">
            <img className="birthdayImg" src={`${PF}gift.png`} alt="birthday" />
            <span className="birthdayText">
              <b>Virat Kohli</b> and <b> 3 other friends </b>have birthday today</span>
          </div>
          <img className="rightAd" src={`${PF}ad.png`} alt="" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users.map(u=>(
              <Online key={u.id} user={u}/>
            ))}
          </ul>
        </>
       );
};

const ProfileRightbar= ()=>{
   return(
    <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <IoMdRemove/> : <IoMdAdd/>}
          </button>
        )}

    <h4 className="rightbarTitle">User Information</h4>
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City:</span>
        <span className="rightbarInfoValue">{user.city}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">From:</span>
        <span className="rightbarInfoValue">{user.from}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship:</span>
        <span className="rightbarInfoValue">
          {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
        </span>
      </div>
    </div>
    <h4 className="rightbarTitle">User Friends</h4>
    <div className="rightbarFollowings">
    {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
    </div>
    <div className="logoutdiv">
     
    <button className="logout" onClick={handlelogout} > Logout </button>
    </div>
    </>
   );
};

  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
         {user ? <ProfileRightbar/> : <HomeRightbar/>}
        </div>
    </div>
  )
}
