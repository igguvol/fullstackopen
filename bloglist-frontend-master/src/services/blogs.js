import axios from 'axios'
const baseUrl = '/api/blogs'

const config = {
  headers: {
    'content-type': 'application/json',
  }
}

const setToken = (token) => {
  config.headers['authorization'] = 'bearer ' + token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (values) => {
  return axios.post(baseUrl, JSON.stringify(values), config)
    .then( (a) => a )
    .catch( (a) => a );
}

const updateBlog = (id,values) => {
  return axios.put( baseUrl + '/' + id, JSON.stringify(values), config)
    .then( (a) => a )
    .catch( (a) => a );
}

const deleteBlog = (id) => {
  console.log('deleteBlog',config);
  return axios.delete( `${baseUrl}/${id}`, config )
    .then( (a) => a )
    .catch( (a) => a );
}

export default { setToken, getAll, postBlog, updateBlog, deleteBlog }