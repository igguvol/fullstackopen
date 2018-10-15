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

  beforeEach(() => {
    app = mount(<App />)
  });


  it('login page is shown if user is not logged in', () => {
    app.update();
    const div = app.find('#login')
    expect(div.text()).toContain( 'Login' )
  })

  it('blogs are shown when user logs in', () => {
    app.update();
    app.login( '', '' );
  })

})

