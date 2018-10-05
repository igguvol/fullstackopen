import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BlogForm extends Component 
{
  constructor(props) {
    super(props);
    this.state = {title:'', author:'', url:''};
  }

  static propTypes = {
    submit: PropTypes.func.isRequired
  }
  

  change = (event) => {
    var n = {};
    n[event.target.name] = event.target.value;
    this.setState(n);
  }

  submit = async ( event, state ) => 
  {
    event.preventDefault();
    if ( await this.props.submit(this.state) ) 
    { 
      this.setState({title:'',author:'',url:''});
    } 
  }
  
  render() 
  {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={ e => this.setState({ visible: true })}>Create new</button>
        </div>
        <div style={showWhenVisible}>
          <h3>Create new</h3>
          <form name="blogForm" onSubmit={(e) => this.submit(e,this.state) }>
            <div key='title'>
              title:
              <input name="title" value={this.state['title']} onChange={this.change} />
            </div>
            <div key='author'>
              author:
              <input name="author" value={this.state['author']} onChange={this.change} />
            </div>
            <div key='url'>
              url:
              <input name="url" value={this.state['url']} onChange={this.change} />
            </div>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={ e => this.setState({ visible: false })}>Cancel</button>
        </div>
      </div>
    );
  }
}


export default BlogForm;