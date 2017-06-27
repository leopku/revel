<template>
  <nav class="top-nav">
    <el-row>
      <el-col :span="16" :offset="1">
        <el-menu theme="light" mode="horizontal" class="bg--white">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">文档</el-menu-item>
          <el-menu-item index="3">下载</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="5" class="float-right" v-show="!isLogin">
        <el-menu theme="light" mode="horizontal" class="bg--white">
          <!-- <el-menu-item index="1" @click="isSignupVisible=true">注册</el-menu-item> -->
          <el-menu-item index="1" @click="$store.state.isSignupVisible=true">注册</el-menu-item>
          <el-menu-item index="2" @click="$store.state.isLoginVisible=true">登入</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3" class="float-right" v-if="isLogin">
        <el-dropdown @command="onDropdownClick" trigger="click" class="flex flex-align--middle">
          <Avatar username="johnjohn"></Avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="typcn typcn-user-outline"></i> 资料</el-dropdown-item>
            <el-dropdown-item><i class="typcn typcn-cog-outline"></i> 设置</el-dropdown-item>
            <el-dropdown-item divided command="logout"><i class="typcn typcn-eject-outline"></i> 登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <Signup></Signup>
    <Login></Login>
  </nav>
</template>

<script>
import Avatar from '@/components/Avatar'
import Signup from '@/components/Signup'
import Login from '@/components/Login'

export default {
  name: 'navbar',
  components: {
    Avatar,
    Signup,
    Login
  },
  methods: {
    onDropdownClick (cmd) {
      switch (cmd) {
        case 'logout':
          console.log('logout')
          this.$store.dispatch('logout')
          break
        default:
          console.log('default')
      }
    }
  },
  computed: {
    isLogin () {
      return Object.prototype.toString.call(this.$store.state.user) !== '[object Null]'
    }
  }
}
</script>

<style scoped lang="scss">
.el-dropdown {
  height: 60px;
}

@media screen and (max-width: 61.999em) {
  nav {
    border-bottom: solid 1px #E5E9F2;
  }
}
</style>
