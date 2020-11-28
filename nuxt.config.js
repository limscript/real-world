/**
 * nuxt.js配置文件
 */

module.exports = {
  router: {
    linkActiveClass: 'active',
    // 自定义路由
    extendRoutes(routes, resolve) {
      routes.splice(0);

      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home'),
            },
            {
              path: '/login', // 登录
              name: 'login',
              component: resolve(__dirname, 'pages/login/login'),
            },
            {
              path: '/register', // 注册
              name: 'register',
              component: resolve(__dirname, 'pages/login/register'),
            },
            {
              path: '/profile/:username', // 个人资料
              name: 'profile',
              component: resolve(__dirname, 'pages/profile'),
            },
            {
              path: '/settings', // 设置
              name: 'settings',
              component: resolve(__dirname, 'pages/settings'),
            },
            {
              path: '/editor', // 编辑
              name: 'editor',
              component: resolve(__dirname, 'pages/editor'),
            },
            {
              path: '/article/:slug', // 文章
              name: 'article',
              component: resolve(__dirname, 'pages/article'),
            },
          ]
        }
      ])
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}
