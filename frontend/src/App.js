import React from "react";
// import { Route, Routes} from "react-router-dom";
import { 
  BrowserRouter as Router ,
  Route, 
  Routes} from 'react-router-dom';

import { useEffect } from "react";
import Axios from "axios";
import Main from "./components/Main";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Text from "./components/Text";
import Leaderboard from "./components/Leaderboard";




const App = () => {
  useEffect(() => {
    Axios.get("http://localhost:5000/isAuth").then((res) => {
      console.log(res.data);
      sessionStorage.setItem("auth", res.data);
  
    });
  
  }, [])
  return (
  
      <Router>
      <Routes>

        <Route exact path="/"         element = { <Main/> }></Route>
        <Route exaxct path="/signin"  element = { <Signin /> } ></Route>
        <Route exact path="/signup"   element = { <Signup/>  }></Route>
        <Route exact path="/text"     element = { <Text/>    }></Route>
        <Route exact path="/leaderboard" element ={ <Leaderboard /> }></Route>
        
        </Routes>

      </Router>

  
  );
}






export default App;
