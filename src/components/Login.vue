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
        No account yet? <a @click="onSignupClick">Sign Up</a>
      </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SWITCH_LOGIN_DIALOG, SWITCH_SIGNUP_DIALOG } from '@/store/mutation-types'

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
    onSignupClick () {
      this.$store.commit(SWITCH_LOGIN_DIALOG, false)
      this.$store.commit(SWITCH_SIGNUP_DIALOG, true)
    },
    onBeforeClose (done) {
      this.$store.commit(SWITCH_LOGIN_DIALOG, false)
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
