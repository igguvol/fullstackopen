import React from 'react'

const Login = (state, change) => (
  <div>
    <div>
      Login
    </div>
    <div key='username'>
      <span>Username:</span>
      <input name="username" value={state['username']} onChange={change} />
    </div> 
    <div key='password'>
      <span>Password:</span>
      <input type="password" name="password" value={state['password']} onChange={change} />
    </div>
  </div>
)

export default Login