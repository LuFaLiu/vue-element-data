import request from '@/utils/request'
export default {
  post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
  get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),

  getRoleList(data,current,size) {
    return request({
      url: '/role/getRoleList?current='+current+'&size='+size,
      method: 'get',
      data,
      showLoading: false
    })
  },

  deleteUser(roleIds) {
    return request({
      url:'/role/delectRole',
      method: 'delete',
      data: accountIds
    })
  },

  saveUser(data){
    return request({
      url:'/role/addRole',
      method:'post',
      data:data
    })
  }


}



