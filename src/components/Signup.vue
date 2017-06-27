<template>
    <el-dialog title="注册" :visible="isSignupVisible()" :before-close="onBeforeClose" size="tiny">
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
        <el-button :loading="loading()" type="primary" class="full--width" size="large" @click="signup(user)">注 册</el-button>
      <div slot="footer" class="dialog-footer">
        Already have a account? <a >Login in</a>
      </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
    ...mapState([
      'loading',
      'isSignupVisible'
    ]),
    onBeforeClose (done) {
      this.$store.state.isSignupVisible = false
      done()
    }
  }
}
</script>
