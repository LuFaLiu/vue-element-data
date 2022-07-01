import request from '@/utils/request'
const userControllerBaseUrl = '/user'
export default {
  post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
  get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),

  /*
  login(data) {
    return request({
      url: userControllerBaseUrl + '/login',
      method: 'post',
      data: data,
      showLoading: true
    })
  },
  logout() {
    return request({
      url: userControllerBaseUrl + '/logout',
      method: 'get'
    })
  },
  updatePass(passForm) {
    return request({
      url: userControllerBaseUrl + '/updatePassword',
      method: 'post',
      data: passForm
    })
  }
  */
  login(data) {
    return request({
      url: '/vue-element-data/user/login',
      method: 'post',
      data,
      showLoading: true
    })
  },
  logout() {
    return request({
      url: '/vue-element-data/user/logout',
      method: 'post'
    })
  },
  updatePass(passForm) {
    return request({
      url: userControllerBaseUrl + '/updatePassword',
      method: 'post',
      data: passForm
    })
  }
  
}
