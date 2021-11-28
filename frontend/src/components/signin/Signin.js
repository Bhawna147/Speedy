import React from 'react'
import Axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import "./signin.css";
Axios.defaults.withCredentials=true;

const Signin = () => {
  const navigate=useNavigate();
 const[username,setUsername]=useState("");
 const[password,setPassword]=useState("");
    const SubmitHandler=(e) => {
        console.log(username,password);
        e.preventDefault();
        Axios.post("http://localhost:5000/login",{
            data:{
                username:username,
                password:password
            }
        }).then((response)=>{
            if(response==="true")
            {
                navigate("/");
            }
            else
            {
                alert("invalid crenditals");
                setPassword("")
                setUsername("")
            }
        }).catch((err)=>{
            console.log(err);
        })
    }


    return (
        <>
        <div className="main-signin">
            <div className="signin-left">
                <h1 className="signin-left-logo">speedy</h1>
                <div className="signin-left-heading">
                    <h2>Welcome To Speedy</h2>
                </div>
            </div>

            <div className="signin-right">
                <div className="signin-right-main">
                <div className="signin-right-inner">
                    <form action="#" method="POST">
                    <input type="text" placeholder="username" value={username} className="signin-username control-inputs" onChange={(e)=>setUsername(e.target.value)} />
                    <input type="password" placeholder="password" value={password} className="signin-password control-inputs" onChange={(e)=>setPassword(e.target.value)} />
                    <button type="submit" className="signin-btn" onClick={(e)=>SubmitHandler(e)}>Signin</button>
                    </form>
                    <div className="signin-btns">
                    <p className="except">Do Not Have An Account?</p>
                    <Link to="/signup"><button className="signin-btn">Signup</button></Link>
                    </div>
                </div>
                <div className="signin-right-main-touch"></div>
                </div>
            </div>

        </div>

        </>
    )
}

export default Signin
