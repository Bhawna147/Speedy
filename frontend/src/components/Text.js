import {io} from 'socket.io-client';
import jQuery from 'jquery'
import styled, { inline } from 'styled-components';

// import React from 'react';
import React, { useState ,useRef ,useEffect } from "react";
import "./text.css";
// import Preview from './Preview';


const roomInput = document.getElementById("room-input")
const joinRoomButton = document.getElementById("room-button")

var value = prompt("Enter User name :: ")




const socket = io('http://localhost:5000')


socket.on('connect' , () => {
 
    alert(value + " successfully connected to server !!")

    newfunc()
   
})

function forState(speedN){
    const [speed, setSpeed] = useState(0);
    setSpeed(speedN);
    return speed;
}

function newfunc(){

    createDiv(value , speed );
    // displayLeaderboard(speed , value);
}



socket.on('received-time-words-name' , (timeElapsed  ,correctWords , value ) => {
    // console.log( timeElapsed);
    // console.log(correctWords);
    // dusre user ke correctwords"
  

    const minutes = timeElapsed/60;
    const speed = ((correctWords/minutes) || 0 ).toFixed(2)
    // displayLeaderboard(speed , value);
    forState(speed);
    // setSpeed(speed);
    // createDiv(value);
})


jQuery(function($){
socket.on('users_count' , function(data){
$('#client_count').text(data);
})
});
//from server to show to every client

// socket.emit("custom-event", 10 , "hi" , {a: "a"  })
// client to server




const getCloud = () => 'bhawna aparna'.split(' ')
// ayush arnab bhurji birju chimni aditya don abhas anunaya harshit rumtika bijli amit naina deempika doggy scooby tikaalaaa
// .sort(() => Math.random() > 0.5 ? 1 : -1)

// var check = 0;

function  createDiv(value ,speed ) {

    socket.on('fetch_id' , (socketId) => {
        // console.log(socketId)
        const idN = socketId;
    

    const div = document.createElement("div")
    const p   = document.createElement("p")

    // var element = document.querySelector("#current-0")
    // if (element) {
    //     element.textContent = dice
    // }
    div.setAttribute("class" , idN)
    p.setAttribute("class" , idN)

    div.textContent = value;
    p.textContent   = 0;


    document.getElementById("Leaderboard-container").append(p)
    document.getElementById("Leaderboard-container").append(div)

    displayLeaderboard(speed , value);

    })


}

function displayLeaderboard( speed , value  ) {

    socket.on('fetch_id' , (socketId) => {
        console.log(socketId)
        const idN = socketId;

    // document.querySelector('h7').innerHTML = value;
    // document.querySelector('h6').innerHTML = speed;

 console.log( document.getElementsByClassName(idN));
    // document.getElementsByClassName(idN).innerHTML = speed;
    // document.querySelector('id').innerHTML = value;
    // document.querySelector('h6').innerHTML = speed;

    })



    // const div = document.createElement("div")
    // const p   = document.createElement("p")


    // div.textContent = speed
    // p.textContent = value


    // document.getElementById("Leaderboard-container").append(p)
    // document.getElementById("Leaderboard-container").append(div)
   
   
}


 // document.getElementById("points").setAttribute('value', new Number(request.responseText));


function Word (props) {


    
    const {text , active  , correct } = props
     
    const rerender = useRef(0)
    // const [speedn , setSpeedn ]  = useState(0); 
        

    // speedn = 0;

    useEffect(() => {
        rerender.current += 1
    })
    
    if(correct === true) {
        return <span className="correct">{text} </span>
        // ({rerender.current})
    }


    if(correct === false) {
        return <span className="incorrect">{text} </span>
    }

    if(active){
        return <span className="active">{text} </span>
    }

    return <span 
    // stlye={{fontWeight: active ? 'bold' : ' normal'}}
    >{text} </span>

}

Word = React.memo(Word)


function Timer(props) { 



    const { correctWords , startCounting} = props
    const [timeElapsed , setTimeElapsed] = useState(0)
    useEffect(() => {
        let id
        if(startCounting) {
            id = setInterval(() => {
            setTimeElapsed(oldTime => oldTime + 1 )
            }, 1000 )
        }
           

        
        return () => {
            clearInterval(id)
        }
    },[startCounting])

    const minutes = timeElapsed/60

   
    socket.emit("send-time-words-name", timeElapsed , correctWords ,value )
    



    // const [sppeed , set Sppeed] = useState(0);
    // const [sppeed , set Sppeed] = useState(0);


    return <div className="speed">
    <div style={{ marginRight: '20%' }}><p>Time : {timeElapsed}</p></div>
    {/* <div className="filler"></div> */}


    <div><p>Speed: {((correctWords/minutes) || 0 ).toFixed(2)} WPM </p></div>
    </div>
    
    // console.log(setSpeedn);
}


function Text () {

    const[userInput , setUserInput] = useState("");
    const cloud  = useRef(getCloud())
    console.log(cloud.current);
   
    const[startCounting , setStartCounting]       = useState(false)

    const[activeWordIndex  , setActiveWordIndex]  = useState(0);
    const[correctWordArray , setCorrectWordArray] = useState([]);

     
function processInput (value){

               
        if(activeWordIndex === cloud.current.length ){
        
            return 
            // stop
        }

        setStartCounting(true)
        // test end

         
        if(value.endsWith(' ')) {

            if(activeWordIndex === cloud.current.length - 1 ){
             //test end
             setStartCounting(false)
             setUserInput('Completed')
       
            }


            //finished word
            setActiveWordIndex(index => index + 1)
            setUserInput('')

            
            // if(word === cloud.current[activeWordIndex]) {



            // correct word 
                setCorrectWordArray(data => {
                    const word = value.trim() 
                    const newResult = [...data]
                    // newResult[activeWordIndex] = true
                    newResult[activeWordIndex] = word ===  cloud.current[activeWordIndex]

                    return newResult
                })
        // }

        }else{
            setUserInput(value)
        }
    }





    return (
        <>



    <div className="text-nav">
        <div><h1>SPEEDY</h1></div>
        <div className="filler"></div>
        <div><p>SignIn</p></div>
        <div><p>SignUp</p></div>
    </div>

    <input type="text" placeholder="enter ROOM id" id="room-input" />
    <button type="button" id="room-button">Join</button>

<span id="client_count"> 0 </span>
 <span> - users online</span>
<div id="Leaderboard-container"> 
<br/>
    <h1>Leaderboard</h1>
    <h7 className="styleH"  style={{ display: 'inline' }}>NA</h7>
    <p  className="styleH"  style={{ display: 'inline' }}>-</p>
    <h6 className="styleH"  style={{ display: 'inline' }}>0</h6>

</div>

<div className="text-body">


    <div className="timer" id="timer">
     <Timer 
     startCounting = {startCounting} 
     correctWords = {correctWordArray.filter(Boolean).length } 
     />


    </div>

     <div className="text-container">
     {/* <Preview /> */}

                 <div className="text-display" id="textDisplay">
                 {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus cupiditate quo laboriosam, odio tempora vitae quibusdam placeat necessitatibus voluptates? Natus tempora optio repellat quam saepe nulla ratione eos ducimus officiis. */}
                 
                 {/* <p> {cloud.current.join(' ')} </p> */}
                 <p> {cloud.current.map((word , index) => {
                        
                        // if(index === activeWordIndex) {
                        //     return <b>{word} </b>
                        // }
                        
                        // return <span>{word} </span>

                        return <Word 
                        text={word} 
                        active= { index === activeWordIndex }
                        correct = {correctWordArray[index]} 
                      />
                 

                 })} </p>



                 </div>




     {/* <p>{userInput}</p> */}
       
     <textarea 

        value={userInput}
        onChange={(e) => processInput(e.target.value)}

          placeholder="Start typing........" className="text-input" autoFocus></textarea>



          
            



     </div>

     <div className="text-bottom">

         {/* <div className="text-speed"><p>
         <Timer
     correctWords = {correctWordArray.filter(Boolean).length } />
     </p></div> */}
         <div className="filler2"></div>
         <div><button className="text-button"
         
         // onClick = {onRestart}
         >Restart</button></div>
   
     </div>


</div>

   



        </>
        
    )
}


// window.render()
export default Text
