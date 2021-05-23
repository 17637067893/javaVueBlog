import axios from 'axios'
const baseURL="/javaservice"
const request = axios.create({
  baseURL: baseURL,
  timeout: 8000
})
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * @description: get请求
 * @param {string} url 请求链接段
 * @param {object} params 请求参数
 * @param {object} config 请求配置
 * @return {*}
 */
const get = (url, params) => {
var config = {
    headers: { 'Content-Type': 'application/json' }
    }
  const reqData = {
    method: 'get',
    url,
    params
  }
  if (config) {
    Object.assign(reqData, config)
  }
  return request(reqData)
}

/**
 * @description: post请求
 * @param {string} url 请求链接段
 * @param {object} params 请求参数
 * @param {object} config 请求配置
 * @return {*}
 */
const post = (url, data) => {
    var config = {
    headers: { 'Content-Type': 'application/json' }
    }
  const reqData = {
    method: 'post',
    url,
    data
  }
  if (config) {
    Object.assign(reqData, config)
  }
  return request(reqData)
}





/**
 * @description: post请求
 * @param {string} url 请求链接段
 * @param {object} params 请求参数
 * @param {object} config 请求配置
 * @return {*}
 */
const postFile = (url, file) => {

  let param = new FormData(); // 创建form对象
   param.append("file", file);

   let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  return axios.post(url, param, config);
}






/**
 * @description: post请求(参数拼接式，类get)
 * @param {string} url 请求链接段
 * @param {object} params 请求参数
 * @param {object} config 请求配置
 * @return {*}
 */
const postOfGet = (url, params, config) => {
  const reqData = {
    method: 'post',
    url,
    params
  }
  if (config) {
    Object.assign(reqData, config)
  }
  return request(reqData)
}
const postOfForm = (url, formData, params, config) => {
  let resultUrl = url
  if (params) {
    let appendUrl = ''
    Object.keys(params).forEach((item, idx) => {
      if (idx === 0) {
        appendUrl += '?'
      } else {
        appendUrl += '&'
      }
      appendUrl += item + '=' + params[item]
    })
    if (appendUrl) {
      resultUrl += appendUrl
    }
  }
  // 配置默认headers
  if (config && !config.headers) {
    config.headers = { 'Content-Type': 'multipart/form-data' }
  } else {
    config = { headers: { 'Content-Type': 'multipart/form-data' } }
  }
  return post(resultUrl, formData, config)
}
export { request, get, post, postOfGet, postOfForm, postFile }