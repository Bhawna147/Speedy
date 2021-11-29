import React from 'react'
// import { Row, Col } from "react-bootstrap";
import "./main.css";
import {  useNavigate } from "react-router-dom";

const Main = () => {

    const navigate =  useNavigate();

    const routeChange = () =>{ 
      let path = `/text`; 
    //   history.push(path);
    //   navigate('/home');
      navigate(path);

    }


    return (
        <>

     <div className="main">
                   <div className="main-left">

                        <div className="main-left-top">

                        <img src="./main-vector.png" alt="vector-Image" className="main-image" />

                       </div>   


                       <div className="main-left-bottom">
                       <div> <button className="main-buttons"
                       onClick = {routeChange}


                       >Start</button></div>
                       {/* <div> <button className="main-buttons">Sign Up</button></div> */}
                       </div>
                   </div>

                           
               <div className="main-right">
                   <p> Let's See <br /> 
                       How Fast You Can Type !!

                   </p>

               </div>

               </div>
                  
                  
               


        </>
    )
}

export default Main
