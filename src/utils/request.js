import axios from 'axios'
import router from '../router'
import Element from 'element-ui'

const CancelToken = axios.CancelToken;


const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

let sources = [] 


let removeSource = (config) =>{
  for(let source in sources){
   
    if(sources[source].umet === config.url + '&' + config.method){
      sources[source].cancel("cancel request");
      sources.splice(source,1);
    }
  }
}

request.interceptors.request.use(config => {
  config.headers['token'] = sessionStorage.getItem('token');

  removeSource(config)
  config.CancelToken = new CancelToken((c)=>{
    sources.push({umet:config.url + '&' + config.method,cancel:c})
  })

  if (config.showLoading) {
    showFullScreenLoading()
  }
  return config
  
})
let loading
let needLoadingRequestCount = 0


export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function startLoading() {
  loading = Element.Loading.service({
    lock: false,
    text: 'Loading……',
    background: 'rgba(0, 0, 0, 0.1)'
  })
}

request.interceptors.response.use(
  response => {

    removeSource(response.config)

    if (response.config.showLoading) {
      tryHideFullScreenLoading()
    }
    const res = response.data;
    if (res.code === 200) {
      return response;
    } else {
      sessionStorage.removeItem('token');
      router.push('/login');
      //Element.Message.error(!res.data.msg ? 'System Exception' : res.data.msg);
      //return Promise.reject(response.data.data.msg);
      return response;
    }
  },
  error => {
    if (error.config.showLoading) {
      tryHideFullScreenLoading()
    }
    if (error.response.data) {
      error.massage = error.response.data.msg
    }

    if (error.response.status === 401) {
      sessionStorage.removeItem('token');
      router.push('/login');
    }
    Element.Message.error(error.massage, { duration: 3000 });
    return Promise.reject(error);
  }
)
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export function endLoading() {
  if (loading) loading.close()
  loading = null
}

export default request
