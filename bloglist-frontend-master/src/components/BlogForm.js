import React, { Component } from 'react';

class BlogForm extends Component 
{
  constructor(props) {
    super(props);
    this.state = {title:'', author:'', url:''};
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
    return (
      <div>
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
      </div>
    );
  }
}

export default BlogForm;