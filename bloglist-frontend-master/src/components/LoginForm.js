import React from 'react'
import Login from './Login'

const LoginForm = (props) => {
  return (
    <div id="login">
      <form onSubmit={props.login}>
        {Login(props.state,props.onLoginChange)}
        <button key='login' onClick={props.login}> Login </button>
      </form>
    </div>
  );
}


export default LoginForm;
