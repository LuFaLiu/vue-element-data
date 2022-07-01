import request from '@/utils/request'
export default {
  post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
  get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),


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
  }
  
}
