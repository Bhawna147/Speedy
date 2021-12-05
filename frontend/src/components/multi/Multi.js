import React from 'react'
// import { io } from "socket.io-client";
import { useState, useEffect } from 'react';
import Text from "./multiText";

const Multi = () => {
    const [socket, setSocket] = useState();
    const [users, setusers] = useState(0);
    // useEffect(() => {
    //     const s = io("http://localhost:5000");//server side port
    //     // console.log(s);
    //     setSocket(s);

    //     return () => {
    //         s.disconnect();
    //     }

    // }, [])
    //    useEffect(() => {
    //        if(socket==null)
    //        return;
    //     var name = window.prompt("Enter your name: ");
    //     // socket.emit("user-name",name);
    //    }, [])  

    // useEffect(() => {
    //     console.log(socket);
    //     if (socket == null)
    //         return;
    //     socket.on("no-of-users", num => {
    //         setusers(num);
    //         console.log(num);
    //         if (num < 5)
    //             alert("please wait so that more people can join")
    //             //SM,DNm,n,MDN,mdnm,dn
    //     })
    // }, [socket])

    // useEffect(() => {
    //     function preventFocus (evt){
    //         evt.preventDefault();
    //       }
    //     if (users < 5) {
    //         let m = document.querySelector(".hel");
    //         let main = document.querySelector(".main"); 
    //         m.classList.remove("hidden");
    //         // pageCover.classList.remove("hidden");
    //         main.addEventListener("focus", preventFocus);
    //     }
    //     //m.msa,msa,.fmas,.m
    //     //snmsndm,Nm,dnM

    // }, [])


    return (
        <div className="main">
            <Text  />
        </div>
    )
}

export default Multi
