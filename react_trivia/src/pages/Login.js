import LoginForm from './loginComponents/LoginForm';
import {userStore} from './stores/UserStore';

const Login = () => {
  const doLogin = async (username, password) => {
    const response = await fetch(`http://localhost:8080/api/user/authorize?userName=${username}&password=${password}`, {
      method: 'GET'
    });

    const result = await response.json(response);

    if(result.isAuthorized) {
      userStore.isLoggedIn = true;
      userStore.username = username;
      userStore.isAdmin = result.user.userAdmin;
      userStore.userId = result.user.userId;
    } else {
      userStore.resetUser();
      alert("Invalid Login Information.");
    }
  }

  const doLogout = () => {
    userStore.resetUser();
  }

  return (
    <div>
      <br/> <br/>
      <LoginForm doLogin={doLogin} doLogout={doLogout} />
    </div>
  )
}

export default Login
