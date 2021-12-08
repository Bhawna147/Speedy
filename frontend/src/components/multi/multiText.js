// import React from 'react'
import React, { useState, useRef, useEffect } from "react";
// import Preview from './Preview';
import { io } from "socket.io-client";
import Leaderboard from "../Leaderboard";

var p = [];
const getCloud = () => 'bhawna aparna ayush arnab bhurji birju chimni aditya don abhas anunaya harshit rumtika bijli amit naina deempika doggy scooby tikaalaaa'.split(' ')
// .sort(() => Math.random() > 0.5 ? 1 : -1)

function Word(props) {

    const { text, active, correct } = props


    const rerender = useRef(0)

    useEffect(() => {
        rerender.current += 1
    })

    if (correct === true) {
        return <span className="correct">{text} </span>
        // ({rerender.current})
    }


    if (correct === false) {
        return <span className="incorrect">{text} </span>
    }

    if (active) {
        return <span className="active">{text} </span>
    }

    return <span
    // stlye={{fontWeight: active ? 'bold' : ' normal'}}
    >{text} </span>

}

Word = React.memo(Word)


function Timer(props) {
    const { correctWords, startCounting } = props
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [speed, setSpeed] = useState(0);
    const [socket, setSocket] = useState();
    useEffect(() => {
        // console.log(speed);
        setSpeed(((correctWords / minutes) || 0).toFixed(2));
        let id
        if (startCounting) {
            id = setInterval(() => {
                setTimeElapsed(oldTime => oldTime + 1)
            }, 1000)
        }


        return () => {
            clearInterval(id)
        }
    }, [startCounting])

    const minutes = timeElapsed / 60;
    useEffect(() => {
        setSpeed(((correctWords / minutes) || 0).toFixed(2));
        // props.speedHandler(speed);
        // console.log(speed, timeElapsed);
    }, [correctWords, timeElapsed])


    useEffect(() => {
        const s = io("http://localhost:5000");//server side port
        // console.log(s);
        setSocket(s);
        return () => {
            s.disconnect();
        }

    }, [])

    // const name;

    useEffect(() => {
        if (socket == null)
            return
        const name = prompt("enter yourusername");
        if (name == null || name == "") {
            alert("please enter the username");
        }
        if (name !== null || name !== "")
            socket.emit("new-user-joined", name);
        socket.on("user-speed-array", pair => {
            console.log(pair);
            setSpeed(pair)
        });
        const setSpeed = (pair) => {
            pair.map((user) => {
                if (document.querySelectorAll(`span[data='${user.socketid}']`)[0]) {
                    return document.querySelectorAll(`span[data='${user.socketid}']`)[0].innerHTML=user.speed;
                }
                else {
                    const sp = document.createElement("span");
                    sp.innerHTML = user.speed;
                    sp.setAttribute("data",user.socketid);
                    return document.querySelectorAll(`div[data='${user.socketid}']`)[0].append(sp);
                }

            })
        }
        const createDiv = (users) => {
            console.log(users, "inside create");
            users.map((user) => {
                console.log(document.querySelectorAll(`div[data='${user.socketid}']`)[0]);
                if (document.querySelectorAll(`[data='${user.socketid}']`).length>0) {
                    return document.querySelectorAll(`div[data='${user.socketid}']`)[0].innerHTML=user.name;
                }
                else {
                    const d = document.createElement("div");
                    d.setAttribute("data", user.socketid);
                    d.textContent = user.name;
                    return document.getElementById("leader").append(d);
                }
            })
        }
        socket.on("usernames", users => {
            console.log(users);
            createDiv(users);
        });
    }, [socket])


    useEffect(() => {
        if (socket == null || speed == null)
            return;
        socket.emit("speed-of-user", speed);
    }, [speed])

    // useEffect(() => {
    //     if (socket == null)
    //         return;
    //     socket.on("user-array-speed",(speeds)=>{
    //         console.log(speeds,"birju");
    //     })
    // }, [socket])


    return <div className="speed">
        <div style={{ marginRight: '20%' }}><p>Time : {timeElapsed}</p></div>
        {/* <div className="filler"></div> */}
        <div><p>Speed: {speed} WPM </p></div>
    </div>

}


function MultiText(props) {
    console.log(props, "a");
    const [userInput, setUserInput] = useState("");
    const cloud = useRef(getCloud())
    console.log(cloud.current);

    const [startCounting, setStartCounting] = useState(false)

    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [correctWordArray, setCorrectWordArray] = useState([]);



    function processInput(value) {


        if (activeWordIndex === cloud.current.length) {

            return
            // stop
        }

        setStartCounting(true)
        // test end


        if (value.endsWith(' ')) {

            if (activeWordIndex === cloud.current.length - 1) {
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
                newResult[activeWordIndex] = word === cloud.current[activeWordIndex]

                return newResult
            })
            // }

        } else {
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



            <div className="text-body">

                <div className="timer" id="timer">
                    <Timer
                        speedHandler={props.speedHandler}
                        startCounting={startCounting}
                        correctWords={correctWordArray.filter(Boolean).length}
                    />


                </div>

                <div className="text-container">
                    {/* <Preview /> */}

                    <div className="text-display" id="textDisplay">
                        {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus cupiditate quo laboriosam, odio tempora vitae quibusdam placeat necessitatibus voluptates? Natus tempora optio repellat quam saepe nulla ratione eos ducimus officiis. */}

                        {/* <p> {cloud.current.join(' ')} </p> */}
                        <p> {cloud.current.map((word, index) => {

                            // if(index === activeWordIndex) {
                            //     return <b>{word} </b>
                            // }

                            // return <span>{word} </span>

                            return <Word
                                text={word}
                                active={index === activeWordIndex}
                                correct={correctWordArray[index]}
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

            <div id="leader">Leader</div>




        </>

    )
}


// window.render()
export default MultiText;
