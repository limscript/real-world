<template>
  <div>
    <!-- 顶部导航栏  -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" exact to="/">Home</nuxt-link>
          </li>

          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/article">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="clear">Clear Cache</a>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link " to="/profile/limscript">
                <img class="user-pic" :src="user.image" />
                {{ user.username }}
              </nuxt-link>
            </li>
            <li class="nav-item" style="position: fixed;right: 20px;">
              <a class="nav-link" @click="logout">Logout</a>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏  -->

    <!-- 子路由  -->
    <nuxt-child />
    <!-- /子路由  -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code
          &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// 仅在客户端加载
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUser']),
    //退出登录
    logout() {
      const is = confirm('确定要退出登录吗？')
      if (is) {
        Cookie.remove('user')
        this.setUser(null)
        this.$router.push('/login')
      }
    },
    // 清除缓存
    clear() {
      alert('缓存已清除')
    }
  }
}
</script>
<style scoped>
.nav-item {
  cursor: pointer;
}
</style>
