import request from '@/utils/request'
export default {
  post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
  get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),

  getRoleList(params) {
    return request({
      url: '/account/getRoleList',
      method: 'get',
      params: params,
      showLoading: true
    })
  }

}
