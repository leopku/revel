<template>
    <el-dialog title="登入" :visible="isLoginVisible" :before-close="onBeforeClose" size="tiny">
      <el-form :model="user">
        <el-form-item>
          <el-input v-model="user.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.password" placeholder="password"></el-input>
        </el-form-item>
      </el-form>
        <el-button :loading="authLoading" type="primary" class="full--width" @click="login(user)">登 入</el-button>
      <div slot="footer" class="dialog-footer">
        <a>Forgot password?</a><br>
        Don't have an account? <a>Sign Up</a>
      </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { HIDE_LOGIN_DIALOG } from '@/store/mutation-types'

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
    onBeforeClose (done) {
      this.$store.commit(HIDE_LOGIN_DIALOG)
      done()
    }
  },
  computed: {
    ...mapGetters([
      'authLoading',
      'isLoginVisible'
    ])
  }
}
</script>
