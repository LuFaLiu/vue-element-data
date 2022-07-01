import request from '@/utils/request'
export default {
  post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
  get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),

  getAccountList(params) {
    return request({
      url: '/account/getAccountList',
      method: 'get',
      params,
      showLoading: false
    })
  },

  deleteUser(accountIds) {
    return request({
      url:'/account/delectAccount',
      method: 'delete',
      data: accountIds
    })
  },

  saveUser(data){
    return request({
      url:'/account/addAccount',
      method:'post',
      data:data
    })
  }


}



