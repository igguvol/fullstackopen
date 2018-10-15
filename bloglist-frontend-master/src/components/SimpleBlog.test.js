import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const mockHandler = jest.fn()

describe.only('<SimpleBlog />', () => {
  it('SimpleBlog tests (5.12, 5.13)', () => {
    const blog = {
      title: 'TestBlog of the Month',
      author: 'R.D. Writer',
      likes: 0,
      url: 'http://domain.com'
    }

    const blogComponent = shallow( <SimpleBlog blog={blog} onClick={mockHandler}/> )
    const nameDiv = blogComponent.find('button');
    nameDiv.simulate('click');
    nameDiv.simulate('click');

    expect(mockHandler.mock.calls.length).toBe(2)
    expect(blogComponent.text()).toContain(blog.title)
  })



})
