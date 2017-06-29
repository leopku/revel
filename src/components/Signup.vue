<template>
    <el-dialog title="注册" :visible="isSignupVisible" :before-close="onBeforeClose" size="tiny">
      <el-form :model="user">
        <el-form-item>
          <el-input v-model="user.username" placeholder="username" size="large"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.email" placeholder="email" size="large"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.password" placeholder="password" size="large"></el-input>
        </el-form-item>
      </el-form>
        <el-button :loading="authLoading" type="primary" class="full--width" size="large" @click="signup(user)">注 册</el-button>
      <div slot="footer" class="dialog-footer">
        Already have a account? <a >Login in</a>
      </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { HIDE_SIGNUP_DIALOG } from '@/store/mutation-types'

export default {
  name: 'signup',
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
      'signup'
    ]),
    onBeforeClose (done) {
      this.$store.commit(HIDE_SIGNUP_DIALOG)
      done()
    }
  },
  computed: {
    ...mapGetters([
      'authLoading',
      'isSignupVisible'
    ])
  }
}
</script>
