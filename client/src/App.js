import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// componenets import
import Navbar from './components/layout/Navbar.js';
import Home from './components/pages/Home.js';
import About from './components/pages/About.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Alerts from './components/layout/Alerts.js';

import PrivateRoute from './components/routing/PrivateRoute.js'


// States layout
import  AlertState from "./context/alert/AlertState";
import  ContactState from "./context/contact/ContactState";
import  AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";
import './App.css';

// set auth state
if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () => {
  return (
    <AuthState>   
    <ContactState>
    <AlertState>
        <Router>
          <Fragment className="App"> 
            <Navbar/>
            <div className="container">
            <Alerts/>
            <Switch>
            <PrivateRoute exact path="/"  component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/Login" component={Login}/>
            </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
