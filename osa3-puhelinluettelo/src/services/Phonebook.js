
import axios from 'axios'
const baseUrl = '/api/persons'
//const baseUrl = 'https://thawing-garden-49856.herokuapp.com/api/persons';

const getAll = () => {
  return axios.get(baseUrl)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}
const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update, remove }
