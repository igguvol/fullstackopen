import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {visible:false};
  }

  switchVisibility = (e) => {
    e.preventDefault();
    this.setState( {'visible':!this.state.visible});
  }

  render()
  {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blog = this.props.blog;
    return (
      <div>
        <div className='blogStyle' id="name" key="name" onClick={(e)=>{this.switchVisibility(e)} }>
          <span>{blog.title} {blog.author}</span>
        </div>
        <div id="info" key="info" style={showWhenVisible} className='blogStyle' >
          <div>
            <b>{blog.title}</b> by <b>{blog.author}</b>
          </div>
          <div>
            &nbsp;{blog.likes} likes &nbsp; <button onClick={(e) => this.props.likeBlog(blog.id, {likes:blog.likes+1})}> like </button>
          </div>
          <div>
            &nbsp;<a href={blog.url}> {blog.url} </a>
          </div>
          { blog.user && 
            <div>
              Added by {blog.user.name}
            </div>
          }
          { (!blog.user || blog.user.username===this.props.username) &&
            <div>
              <button onClick={(e) => this.props.deleteBlog(blog.id)}>
                delete
              </button>
            </div>
          }
          </div>
        <br />  
      </div>
    );
  }
}

Blog.propTypes = {
  username: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}


export default Blog