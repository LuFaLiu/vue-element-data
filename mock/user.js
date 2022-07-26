
const vue = require('vue');
const tokens = {
  admin: {
    token: 'adminToken',
    permissions:'admin',
    userName:'admin',
  },
  developer: {
    token: 'developerToken',
    permissions:'developer',
    userName:'developer',
  }
}


module.exports = [
  // login
  {
    url: '/vue-element-data/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body;
      const token = tokens[username];
      return {
          code:token ? 200 : 401,
          data: token ? token : { msg:'login.wrongAccount'}
      };

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
