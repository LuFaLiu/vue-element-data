import request from '@/utils/request'
export default {
  post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
  get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),

  getHomeInfo() {
    return request({
      url: '/home/getHomeInfo',
      method: 'get'
    })
  }
  
}
