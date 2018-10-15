

const login = async (username, password) => {
  return Promise.resolve( { status:200, data: {username:"test user",token:"123"} } )
}

export default { login }