import request from '@/utils/request'
export default {
    post: (url, data, config = { showLoading: false }) => request.service.post(url, data, config),
    get: (url, params, config = { showLoading: false }) => request.service.get(url, params, config),

    getDynamicList(params) {
      return request({
        url: '/table/dynamicList',
        method: 'get',
        params,
        showLoading: false
      })
    },

    getDynamicListPaging(data,current,size) {
      return request({
        url: '/table/dynamicListPaging?current='+current+'&size='+size,
        method: 'get',
        data,
        showLoading: false
      })
    },

    operationDynamicList(data) {
      return request({
        url: '/table/operationDynamicList',
        method: 'post',
        data,
        showLoading: false
      })
    },

    

    getDefaultList(params) {
      return request({
        url: '/table/defaultList',
        method: 'get',
        params,
        showLoading: false
      })
    },

    saveComponent(data) {
      return request({
        url: '/page/addPageNode',
        method: 'post',
        data,
        showLoading: false
      })
    },

    getPageNode(params) {
      return request({
        url: '/page/getPageNode',
        method: 'get',
        params,
        showLoading: false
      })
    }

} 
