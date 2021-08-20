import React, {useState} from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import Typography from '@material-ui/core/Typography';
import {observer} from 'mobx-react'
import {userStore} from '../stores/UserStore'
import styles from '../styles/Style.css'
import { Paper } from '@material-ui/core';

const LoginForm = observer(({doLogin, doLogout}) => {
        var [userName, setUserName] = useState('');
        var [password, setPassword] = useState('');

        return (
            <div className="form">
                <Paper Paper elevation={3} square={false}>
                <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                    {userStore.isLoggedIn ? `Welcome ${userStore.username}` : "Login"}
                </Typography>
                <InputField
                    type='text'
                    placeholder='Username'
                    onChange = {(e) => setUserName(e)}
                    disabled = {userStore.isLoggedIn}
                />
                <br/><br/>
                <InputField
                    type='password'
                    placeholder='Password'
                    onChange={(e) => setPassword(e)}
                    disabled = {userStore.isLoggedIn}
                />
                <SubmitButton
                    text={userStore.isLoggedIn ? 'Logout' : 'Login'}
                    onClick={
                        userStore.isLoggedIn
                            ? () => doLogout()
                            : () => doLogin(userName, password)}
                />
                <br/>
                </Paper>
                <a href="/registration">No account? Register here!</a>

            </div>
        );
    })


export default LoginForm;


