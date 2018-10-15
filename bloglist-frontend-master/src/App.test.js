import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'


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



describe('<App />', () => {

  let app

  describe('before login', () => {
    beforeEach(() => {
      app = mount(<App />)
    });

    it('login page is shown', () => {
      app.update();
      const div = app.find('#login')
      expect(div.text()).toContain( 'Login' )
    })
  })

  describe('after login', () => {
    beforeEach(() => {
      app = mount(<App />)
      window.localStorage.setItem( 'login', '{"token":"test","username":"test"}' );
    });

    it('user is logged in', () => {
      app.update();
      const div = app.find('#BlogPage')
      expect(div.text()).toContain( 'logged in' )
    });

    it('blogs are shown', () => {
      app.update();
      const div = app.find('#BlogPage')
      expect(div.text()).toContain( 'blogs' )
      expect(div.text()).toContain( 'Dijkstra' )
    })
  })

})

