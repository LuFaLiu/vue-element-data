import request from '@/utils/request'
export default {
  post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
  get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),

  getMockMenuList() {
    return request({
      url: '/menu/getmenuList',
      method: 'get',
      showLoading: true
    })
  },
  getMockMenuInfo(params) {
    return request({
      url: '/menu/editMenu',
      method: 'get',
      params:params
    })
  },
  operateMockMenu(data) {
    return request({
      url: '/menu/operateMenu',
      method: 'post',
      data
    })
  },
}

