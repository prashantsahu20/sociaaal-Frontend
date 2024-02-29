import "./sidebar.css";
import { MdRssFeed } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { BsChatSquareTextFill } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { IoBookmarkSharp } from "react-icons/io5";

import {Users} from "../../dummyData"
import CloseFriends from "../closeFriends/CloseFriends";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarlist">
          <li className="sidebarlistitem">
           <MdRssFeed className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Feed</span>
          </li>
          
          <li className="sidebarlistitem">
           <BsChatSquareTextFill className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Chats</span>
          </li>

          <li className="sidebarlistitem">
           <BiSolidVideos className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Videos</span>
          </li>

          <li className="sidebarlistitem">
           <MdGroups className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Groups</span>
          </li>

          <li className="sidebarlistitem">
           <IoBookmarkSharp className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Bookmarks</span>
          </li>

          <li className="sidebarlistitem">
           <MdHelpOutline className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Questions</span>
          </li>

          <li className="sidebarlistitem">
           <MdWorkOutline className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Jobs</span>
          </li>

          <li className="sidebarlistitem">
           <MdEventAvailable className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Events</span>
          </li>

          <li className="sidebarlistitem">
           <IoSchool className="sidebarIcon"/>
           <span className="sidebarlistitemtext">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map(u=>(
             <CloseFriends key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
