import axios from "axios";
import "./register.css"
import { useRef } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
 
  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
           passwordAgain.current.setCustomValidity("Password do not match!!")
    }else{
        const user ={
             username: username.current.value,
             email:email.current.value,
             password:password.current.value
        }
        try{
              await axios.post("http://localhost:8000/api/auth/register",user);
              navigate("/login");
        }catch(err){
                console.log(err);
        }

    }
  };
  return (
    <div className="login">
        <div className="loginWrapper">
           <div className="loginLeft">
             <h4 className="loginLogo">SOCIAAAL</h4>
             <span className="loginDesc">
                Connect with Friends and World around you on Sociaaal!
             </span>
           </div>
           <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Username" required ref={username} className="loginInput" />
                <input placeholder="Email" required ref={email} type="email" className="loginInput" />
                <input placeholder="Password" required ref={password} type="password" minLength="6" className="loginInput" />
                <input placeholder="Password Again" required ref={passwordAgain} type="password" minLength="6" className="loginInput" />
                <button className="loginButton" type="submit">Sign Up</button>
                <Link to="/login" style={{textDecoration:"none"}}>
                <button className="loginRegisterButton">Log into your Account</button> 
                </Link>
            </form>
           </div>

        </div>
    </div>
  )
}
