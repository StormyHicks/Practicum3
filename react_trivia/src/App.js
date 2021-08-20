import React from "react";
import './App.css';
import {Route, BrowserRouter} from "react-router-dom"; 
import Home from './pages/Home'
import Category from './pages/Category'
import Login from './pages/Login'
import QuizStart from './pages/QuizStart'
import Registration from './pages/Registration'
import Results from './pages/Results'
import User from './pages/User'
import Navbar from "./pages/Navbar";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { autorun } from "mobx";
import { userStore } from "./pages/stores/UserStore";
import AdminPage from "./pages/Admin";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://franklin.edu/">
        Franklin University COMP 394 - Summer 2021 Team 2
      </Link>{' '}
      {'.'}
    </Typography>
  );
}

function App() {
  autorun(
    () => {
      var mem = JSON.stringify(userStore);
      sessionStorage.setItem('userStore', mem);
    },
    {
      delay: 1000,
    }
  )
  
  var store = sessionStorage.getItem('userStore');
  if(store != null) {
    Object.assign(userStore, JSON.parse(store));
  }
  

  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component= {Home}/>
      <Route exact path="/category" component= {Category}/>
      <Route exact path="/login" component= {Login}/>
      <Route exact path="/quiz/:currCategory/:numQuestions" component= {QuizStart}/>
      <Route exact path="/registration" component= {Registration}/>
      <Route exact path="/results" component= {Results}/>
      <Route exact path="/user" component= {User}/>
      <Route exact path="/admin" component={AdminPage}/>

      <div width="100%">
          {/* Footer */}
          <footer className="Footer">
            <Paper variant="outlined" square>
            <Typography variant="h6" align="center" gutterBottom>
              Team 2
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Thanks for playing!
            </Typography>
            <Copyright />
            </Paper>
          </footer>
          {/* End footer */}
      </div>
    </div>
  );
}

export default App;