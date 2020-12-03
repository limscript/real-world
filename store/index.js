const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null, // 当前用户状态
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // 特殊的actions方法，该方法仅会在服务端渲染期间调用
  // 作用：初始化容器数据，传递数据给客户使用
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    // 如果请求头中有cookie
    if (req.headers.cookie) {
      // cookieparser将cookie字符串转为js对象
      const parsedCookie = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsedCookie.user)
      } catch (error) {

      }
      commit('setUser', user)
    }
  }
}
