import React from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'

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
        blogs.sort( (a,b) => b.likes - a.likes );
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
      }
      catch ( e )
      {
        // in case of error, clear local storage just in case
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
    this.setState( {username:data.username, 'token':data.token} );
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

  submitBlog = async (state) => {
    try
    {
      const reply = await blogService.postBlog( state );
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
    const reply = await blogService.updateBlog( id, values )
    if ( reply.status === 200 || reply.response.status === 200 )
      this.showNotification( 'Liked', 'success' );
    else
      this.showNotification( 'Something went wrong', 'error' );
  }

  deleteBlog = async (id) => 
  {
    if ( window.confirm( 'delete blog?' ) === true )
    {
      const reply = await blogService.deleteBlog( id );
      if ( reply.status === 200 || reply.response.status === 200 )
      {
        this.showNotification( 'Blog entry deleted', 'success' );
        const b = this.state.blogs.filter( (a) => a.id !== id );
        this.setState( {blogs:b} );
      }
      else
        this.showNotification( reply.response.statusText, 'error' );
    }
  }



  render() {
    const token = this.state.token;

    return (
      <div>
      <Notification message={this.state.notification} style={this.state.notificationStyle}/>
      (token && token!=='' ?
        <BlogPage username={this.state.username} 
          logout={this.logout}
          submitBlog={this.submitBlog}
          blogs={this.state.blogs}
          likeBlog={this.likeBlog}
          deleteBlog={this.deleteBlog}
          />
        :
        <LoginForm onSubmit={this.login} state={this.state} onLoginChange={this.onLoginChange}/>
      </div>
    )
  }
}

export default App;
