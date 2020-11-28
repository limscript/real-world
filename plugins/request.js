/**
 * 封装axios.js
 */

import axios from "axios";

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取上下文对象
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(config => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, err => {
    return Promise.reject(err)
  })
  // 响应拦截器
}
