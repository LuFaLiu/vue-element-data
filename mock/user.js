
const tokens = {
  admin: {
    token: 'adminToken'
  },
  developer: {
    token: 'developerToken'
  }
}


module.exports = [
  // login
  {
    url: '/vue-element-data/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      return {
        code: 200,
        data: token
      }
    }
  },

  // logout
  {
    url: '/vue-element-data/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
