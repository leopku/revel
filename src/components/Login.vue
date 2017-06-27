<template>
    <el-dialog title="登入" :visible="isLoginVisible()" :before-close="onBeforeClose" size="tiny">
      <el-form :model="user">
        <el-form-item>
          <el-input v-model="user.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.password" placeholder="password"></el-input>
        </el-form-item>
      </el-form>
        <el-button :loading="loading()" type="primary" class="full--width" @click="login(user)">登 入</el-button>
      <div slot="footer" class="dialog-footer">
        <a>Forgot password?</a><br>
        Don't have an account? <a>Sign Up</a>
      </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      user: {
        username: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    ...mapState([
      'loading',
      'isLoginVisible'
    ]),
    onBeforeClose (done) {
      this.$store.state.isLoginVisible = false
      done()
    }
  }
}
</script>
