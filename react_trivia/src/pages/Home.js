import React from 'react';
import UserStore, { userStore } from './stores/UserStore';
import { createGenerateClassName } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import KanbanImg from './styles/Kanban2.png';
import styles from './styles/trivstyles.module.css';
import { Link } from 'react-router-dom';


function Home() {
    function WelcomeMessage() {
      if (userStore.isLoggedIn) {
        return ", " + userStore.username + "!";
      }
    }

    return (
      <div>
        <br/> <br/>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Welcome to Trivia Application{WelcomeMessage()}
        </Typography>
        <p> We are excited to have you. If this is your first time, please: </p>
        <Link to='/registration'><input type="button" value="Register" className={styles.navbarbutton}></input></Link>
        <p>If you are a returning player, please login using the navbar above.</p>
        <img src={KanbanImg} alt="logo" />
      </div>

    );
}

export default Home;
