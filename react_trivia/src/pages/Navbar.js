import React from 'react';
import { Link } from 'react-router-dom'
import styles from './styles/trivstyles.module.css'
import { Paper } from '@material-ui/core';


function Navbar() {
  return (
    <div class={styles.navbar}>
      <Paper elevation= "3">
       <Link to="/"><input type="button" value="Home" className={styles.navbarbutton}/></Link>
       <Link to="/category"><input type="button" value="Category" className={styles.navbarbutton}/></Link>
       <Link to="/user"><input type="button" value="User" className={styles.navbarbutton}/></Link>
       <Link to="/login"><input type="button" value="LogIn" class="navbutton" className={styles.navbarbutton}/></Link>
      </Paper>
    </div>
  );
}

export default Navbar; 