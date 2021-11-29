// import React from 'react'
import React, { useState ,useRef ,useEffect } from "react";
import "./text.css";
import Preview from './Preview';


const getCloud = () => 'bhawna aparna ayush arnab bhurji birju chimni aditya don abhas anunaya harshit rumtika bijli amit naina deempika doggy scooby tikaalaaa'.split(' ')
// .sort(() => Math.random() > 0.5 ? 1 : -1)

function Word (props) {
    
    const {text , active  , correct } = props
     
    const rerender = useRef(0)

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


function Timer(props){
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


    return <div className="speed">
    <div style={{ marginRight: '20%' }}><p>Time : {timeElapsed}</p></div>
    {/* <div className="filler"></div> */}
    <div><p>Speed: {((correctWords/minutes) || 0 ).toFixed(2)} WPM </p></div>
    </div>

}


function Text () {

    const[userInput , setUserInput] = useState("");
    const cloud  = useRef(getCloud())
    console.log(cloud.current);
   
    const[startCounting , setStartCounting] = useState(false)

    const[activeWordIndex  , setActiveWordIndex] = useState(0);
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
