import React from 'react';
import './App.css';

import { 
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Signin from './pages/Signin';
import Main from './pages/Main';
import RegisterForm from './componets/RegisterForm';
import AvatarForm from './componets/AvatarForm';



const NotFound = () => {
  return ( 
    <div>
    <h1>404 Page not found</h1>
    </div>
    );
  }
  
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signup" component={RegisterForm}/>
          <Route exact path="/404" component={NotFound}/>
          <Route exact path="/upload/profile_pic" component={AvatarForm}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
