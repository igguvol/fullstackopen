import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders blogStyle', () => {
    const blog = {
      title: 'TestBlog of the Month',
      author: 'R.D. Writer',
      likes: 0,
      url: 'http://domain.com'
    }

    var click = 0;
    const blogComponent = shallow( <SimpleBlog blog={blog} onClick={(e)=>click++}/> )
    const contentDiv = blogComponent.find('.title')
    const nameDiv = blogComponent.find('button');
    nameDiv.simulate('click');
    nameDiv.simulate('click');

    expect( click ).toBe( 2 ); 
    expect(blogComponent.text()).toContain(blog.title)
  })
})
