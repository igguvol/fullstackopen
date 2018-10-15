
const blogs = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },{
    id: '90900909909090',
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: 'http://domain.com',
    likes: 12
  }
];


const setToken = (token) => {
}

const getAll = () => {
  return Promise.resolve( blogs );
}

const postBlog = (values) => {
  let v = values;
  v.id = 123123123;
  return Promise.resolve({ status: 201, data: v });
}

const updateBlog = (id,values) => {
  return Promise.resolve({ status: 200 });
}

const deleteBlog = (id) => {
  return Promise.resolve({ status: 200 });
}

export default { setToken, getAll, postBlog, updateBlog, deleteBlog }