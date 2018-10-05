import React from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification' 

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
      {
        const b = blogs.sort( (a,b) => b.likes - a.likes );
        this.setState({ blogs })
      }
    )
    // restore token from localStorage
    const login = window.localStorage.getItem('login');
    if ( login && login !== '' )
    {
      try
      {
        const l = JSON.parse(login);
        this.storeLogin(l);
        console.log('_________ set token: ', l.token)
      }
      catch ( e )
      {
        // in case of error, clear local storage just in case
        console.log('_________ CLEAR token ')
        window.localStorage.clear();
      }
    }
  } 

  showNotification = (message, style) => {
    this.setState( {notification:message,notificationStyle:style} );
    setTimeout(() => { this.setState({notification: null}) }, 2000);
  }  

  storeLogin( data )
  {
    window.localStorage.setItem( 'login', JSON.stringify(data) );
    this.setState( {username: data.username, 'token': data.token} );
    blogService.setToken( data.token );
  }

  // handle login
  login = async (event) => 
  {
    event.preventDefault();
    try 
    {
      const resp = await loginService.login( this.state.username, this.state.password );
      if ( resp && resp.status === 200 && resp.data && resp.data.token )
      {
        this.storeLogin( resp.data );
        this.showNotification('Login success', 'success');
      }
      else
        this.showNotification('Login failed', 'error');
    } catch(e) {
      this.showNotification('Login failed', 'error');
    }
  }

  logout = (event) => 
  {
    event.preventDefault();
    window.localStorage.clear();
    this.setState( {token:'',username:'',password:''} );
  }

  // callback to store username and password to state
  onLoginChange = (event) => {
    var n = {};
    n[event.target.name] = event.target.value;
    this.setState(n);
  }

  submit = async (state) => {
    try
    {
      const reply = await blogService.post( state );
      console.log('________ reply:',reply)
      if ( reply.status === 201 || reply.response.status === 201 )
      {
        this.showNotification( 'Blog "' + reply.data.title + '" added succesfully', 'success' );
        const blogs = this.state.blogs;
        blogs.push( reply.data );
        this.setState( {blogs:blogs} );
        return true;
      }
      else
        this.showNotification( reply.response.data.error, 'error' );
    }
    catch (e) 
    {
      console.log('submit error:',e);
      this.showNotification( 'error', 'error' );
    }
    return false;
  }

  likeBlog = async (id, values) => 
  {
    const reply = await blogService.update( id, values )
    if ( reply.status === 200 || reply.response.status === 200 )
      this.showNotification( 'Liked', 'success' );
    else
      this.showNotification( 'Something went wrong', 'error' );
  }

  render() {
    const token = this.state.token;

    if (token && token !== '')
      return (
        <div>
          <Notification message={this.state.notification} style={this.state.notificationStyle}/>
          <h2>blogs</h2>
          <h4 >{this.state.username} logged in &nbsp;
            <button key='logout' onClick={this.logout}> Logout </button>
          </h4>
          <BlogForm submit={this.submit}/>
          <br />
          {this.state.blogs.map(blog => 
            <Blog likeBlog={this.likeBlog} key={blog.id} blog={blog}/>
          )}
        </div>
      )
    else
      return (
        <div>
          <Notification message={this.state.notification} style={this.state.notificationStyle}/>
          <form onSubmit={this.login}>
            {Login(this.state,this.onLoginChange)}
            <button key='login' onClick={this.login}> Login </button>
          </form>
        </div>
      );
  }
}

export default App;
