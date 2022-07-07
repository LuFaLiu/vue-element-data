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
  },

  
  getRoleMenuInfo(params) {
    return request({
      url: '/account/getRoleMenuInfo/',
      method: 'get',
      params,
      showLoading: true
    })
  },
  grantRolePermission(data) {
    return request({
      url: roleBaseUrl + '/grantRolePermission/',
      method: 'post',
      data: data,
      showLoading: true
    })
  },
  saveOrUpdateRole(data) {
    return request({
      url: '/account/operate',
      method: 'post',
      data: data,
      showLoading: true
    })
  },

  deleteSelectRole(data){
    return request({
      url: '/account//delete',
      method: 'post',
      data: data
    })
  },

  disableRole(data){
    return request({
      url: '/account//disableRole' ,
      data:data,
      method: 'post'
    })
  }

}
