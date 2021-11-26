import React from "react";
// import { Route, Routes} from "react-router-dom";
import { 
  BrowserRouter as Router ,
  Route, 
  Routes} from 'react-router-dom';


import Main from "./components/Main";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Text from "./components/Text";
import Leaderboard from "./components/Leaderboard";




const App = () => {
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
