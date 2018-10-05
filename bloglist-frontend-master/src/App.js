import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      username: '',
      password: '',
      blogs: []
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  // handle login
  login = async (event) => 
  {
    event.preventDefault();
    const resp = await loginService.login( this.state.username, this.state.password );
    if ( resp && resp.status === 200 && resp.data && resp.data.token )
      this.setState( {'token': resp.data.token} );
    // TODO: show error
  }

  logout = async (event) => 
  {
    event.preventDefault();
    this.setState( {username:'',password:'',token:''} );
  }

  // callback to store username and password to state
  onLoginChange = (event) => {
    var n = {};
    n[event.target.name] = event.target.value;
    console.log('onLoginChange: ', n,event);
    this.setState(n);
  }


  render() {
    return (
      this.state.token && this.state.token !== '' ?
        <div>
          <h2>blogs</h2>
          <h4 >{this.state.username} logged in &nbsp;
            <button key='logout' onClick={this.logout}> Logout </button>
          </h4>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
        </div>
      :
        <div>
          <form onSubmit={this.login}>
            {Login(this.state,this.onLoginChange)}
            <button key='login' onClick={this.login}> Login </button>
          </form>
        </div>
    );
  }
}

export default App;
