import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const data = JSON.stringify( {username:username,password:password} )
  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }
  const request = await axios.post( baseUrl, data, config )
  return request;
}

export default { login }