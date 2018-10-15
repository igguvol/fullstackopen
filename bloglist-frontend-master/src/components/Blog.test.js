import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'


let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock


const dummyFunc = () => {
  console.log('dummyFunc called')
}



describe('<Blog />', () => {

  const blog = {
    title: 'TestBlog of the Month',
    author: 'R.D. Writer',
    likes: 0,
    url: 'http://domain.com'
  }

  let blogComponent

  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} username='test' deleteBlog={dummyFunc} likeBlog={dummyFunc}/>)
  });


  it('at start the children are not displayed', () => {
    const div = blogComponent.find('#info')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('blog name is displayed', () => {
    const nameDiv = blogComponent.find('#name');
    expect(nameDiv.text()).toContain(blog.title)
  })

  it('blog url is shown after click', () => {
    const nameDiv = blogComponent.find('#name');
    nameDiv.simulate('click',  { preventDefault() {} });
    const infoDiv = blogComponent.find('#info') 
    expect(infoDiv.getElement().props.style).toEqual({display:''})
    expect(infoDiv.text()).toContain(blog.url)
  })
  

})

