import React from 'react';
import Typography from '@material-ui/core/Typography';
import './styles/Style.css';
import { Paper } from '@material-ui/core';
import { shadows } from '@material-ui/system';
import ReactState, { useEffect, useState } from "react";

function Registration() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const format = /[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const emailFormat = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  };

  const handleEmailChange = event => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value)
  };

  const handleSubmit = async event => {
    event.preventDefault();
    var send = true;
    if(format.test(username)){
      { alert('Username has special characters'); send = false}
    } if(emailFormat.test(email)){
      { alert('Email has special characters'); send = false }
    }if(password !== confirmPassword){
      { alert('Passwords do not match'); send = false }
    } 
    else if (send) {
      const myReg = {"userEmail": email, "userName": username, "userPassword": password};
      const send = await fetch('http://localhost:8080/api/user/create',
      {
        method: "POST",
        body: JSON.stringify(myReg),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      try {
        const resp = await send.json();
        console.log(resp.userName);
        if (resp.userName != undefined) {
          alert("Thank you for registering. Please log in using the navbar at the top.");
        }
        }
        catch(err) {
          alert("Username is already in use.");
        }
    }
  };

    return (
        <div class="form">
        <br/> <br/>
        <Paper elevation={3} square={false}>
          <br/>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            Trivia Application
          </Typography>
          <div class="subtitle">Thank you for registering!</div>
          <form onSubmit={handleSubmit}>
            <div class="input-container ic1">
              <input required id="username" class="regInput" type="text" name="username" placeholder="Username" maxLength="12" onChange={handleUsernameChange} value={username}/>
            </div>
            <div class="input-container ic2">
              <input required id="password" class="regInput" type="password" name="password" placeholder="Password" maxLength="12" onChange={handlePasswordChange} value={password} />
            </div>
            <div class="input-container ic2">
              <input required type="password" name="confirmPassword" id="confirmPassword" class="regInput" placeholder="Confirm Password"  onChange={handleConfirmPasswordChange} value={confirmPassword} />
            </div>
            <div class="input-container ic2">
              <input required name = "email" id="email" class="regInput" type="email" placeholder="Email" onChange={handleEmailChange} value={email}/>
            </div>
            <button class="submit" type="submit">Register</button>
            <br/><br/>
          </form>
          </Paper>
      </div>

    );
}

export default Registration;
