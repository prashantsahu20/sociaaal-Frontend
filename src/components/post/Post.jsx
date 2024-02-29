import "./post.css"
import { IoMdMore } from "react-icons/io";
import { useState,useEffect } from "react";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
 
export default function Post({post}) {

    const [like,setLike]= useState(post.like.length);
    const [islike,setIslike]= useState(false);
    const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);
    
    useEffect(() => {
        setIslike(post.like.includes(currentUser._id));
      }, [currentUser._id, post.like]);

    useEffect(()=>{
        const fetchUser = async ()=>{
          try{   
            const res = await axios.get(`http://localhost:8000/api/users/${post.userId}`);
            setUser(res.data);
          }catch(err){
            console.log(err);
          }
        };
        fetchUser();
      },[post.userId]);

    const likeHandler=()=>{
        try{
            axios.put("http://localhost:8000/api/posts/" + post._id + "/like", { userId: currentUser._id });
        }catch(err){
            console.log(err);
        }
        setLike(islike ? like-1 : like+1)
        setIslike(!islike)
    }
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img className="postProfilePic" 
                     src={
                        user.profilePicture
                          ? PF + user.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                    alt="profilePic" />
                    </Link>
                    <span className="postUserName">
                        {user.username}
                    </span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <IoMdMore/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc} </span>
                <img className="postImg" src={PF+post.img} alt="post" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="like" />
                    <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="heart" />
                    <span className="postLikeCounter">{like} people like it </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
