import React from 'react'
// import { Row, Col } from "react-bootstrap";
import {Link } from "react-router-dom"
import "./main.css";

const Main = () => {
    return (
        <>

     <div className="main">
                   <div className="main-left">

                        <div className="main-left-top">

                        <img src="./main-vector.png" alt="vector-Image" className="main-image" />

                       </div>   


                       <div className="main-left-bottom">
                       <div> <Link to="/text"><button className="main-buttons">Start</button></Link></div>
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
