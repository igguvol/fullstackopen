import React from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogPage = (props) => {
  return (
    <div key='BlogPage'>
      <h2>blogs</h2>
      <h4 >{props.username} logged in &nbsp;
        <button key='logout' onClick={props.logout}> Logout </button>
      </h4>
      <BlogForm submit={props.submitBlog}/>
      <br />
      {props.blogs.map(blog => 
        <Blog key={blog.id} blog={blog}
          username={props.username}
          likeBlog={props.likeBlog} 
          deleteBlog={props.deleteBlog}
        />
      )}
    </div>
  )
}

export default BlogPage;
