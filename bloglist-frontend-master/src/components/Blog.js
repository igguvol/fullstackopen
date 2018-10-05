import React from 'react'


class Blog extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {visible:false};
  }

  render()
  {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blog = this.props.blog;
    return (
      <div>
        <div className='blogStyle' key="name" onClick={(e)=>{e.preventDefault();this.setState( {'visible':!this.state.visible});} }>
          <span>{blog.title} {blog.author}</span>
        </div>
        <div key="info" style={showWhenVisible} className='blogStyle' >
          <div>
            <b>{blog.title}</b> by <b>{blog.author}</b>
          </div>
          <div>
            &nbsp;{blog.likes} likes &nbsp; <button onClick={(e) => this.props.likeBlog(blog.id, {likes:blog.likes+1})}> like </button>
          </div>
          <div>
            &nbsp;<a href={blog.url}> {blog.url} </a>
          </div>
          <div>
            Added by {blog.user.name}
          </div>
        </div>
        <br />  
      </div>
    );
  }
}


export default Blog