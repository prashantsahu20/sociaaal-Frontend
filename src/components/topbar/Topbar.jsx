// import { Search,Person } from "@mui/icons-material"
import { IoIosPerson } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdNotifications } from "react-icons/md";
import {Link} from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
  
export default function Topbar() {
  const {user} = useContext(AuthContext); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topBarContainer">
       <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
         <span className="logo">SOCIAAAL</span>
         </Link>
       </div>
       <div className="topbarCenter">
           <div className="searchBar">
            {/* <Search/> */}
             <FaSearch  className="searchIcon"/>
            <input placeholder="Search for friend,post & more" className="searchInput" />
           </div>
       </div>


       <div className="topbarRight">
         <div className="topbarLinks">
              <span className="topbarlink">Homepage</span>
              <span className="topbarlink">Timeline</span>
         </div>
         <div className="topbarIcons">
          <div className="topbarIconItem">
          <Link to={`/profile/${user.username}`} style={{textDecoration:"none",color:"white"}}>
               <IoIosPerson />
          </Link>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <Link to="/messenger" style={{textDecoration:"none",color:"white"}}>
              <IoChatbubbleEllipsesSharp />
          </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
          <MdNotifications />
            <span className="topbarIconBadge">1</span>
          </div>
         </div>

         <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        </div> 
    </div>
  )
}
