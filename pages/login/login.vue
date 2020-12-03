<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(err, index) in messages" :key="index">{{ field }} {{ err }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/user'
// 仅在客户端加载
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 提交表单
    async onSubmit() {
      const res = await login({
        user: this.user
      }).catch(err => {
        console.dir(err.response.data.errors)
        this.errors = err.response.data.errors
      })
      console.log({ res })
      if (res && res.status === 200) {
        // 保存用户状态
        this.setUser(res.data.user)
        // 数据持久化
        Cookie.set('user', res.data.user)
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
