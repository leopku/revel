<template>
  <nav class="top-nav">
    <el-row>
      <el-col :xs="{span: 20}" :sm="{span: 0}" :md="{span: 0}" :lg="{span: 0}" :span="0">
        <div style="height: 60px;" class="flex flex-align--middle flex-justify--between">
          <i class="typcn typcn-th-menu"></i>
          <!-- <router-link :to="{ name: 'new-topic'}">
            <i class="typcn typcn-edit"></i>
          </router-link> -->
          <i class="typcn typcn-edit" @click="onNewTopic"></i>
        </div>
      </el-col>
      <el-col :xs="{span: 0}" :sm="{span: 16}" :md="{span: 16}" :lg="{span: 16}" :span="16" :offset="1">
        <el-menu theme="light" mode="horizontal" class="bg--white" :router="true">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="2">文档</el-menu-item>
          <el-menu-item index="3">下载</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="{span: 0}" :sm="{span: 5}" :md="{span: 5}" :lg="{span: 5}" :span="5" class="float-right" v-show="!isLogin">
        <el-menu theme="light" mode="horizontal" class="bg--white">
          <el-menu-item index="1" @click="$store.commit('SWITCH_SIGNUP_DIALOG', true)">注册</el-menu-item>
          <el-menu-item index="2" @click="$store.commit('SWITCH_LOGIN_DIALOG', true)">登入</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="{span: 0}" :sm="{span: 3}" :md="{span: 3}" :lg="{span: 3}" :span="3" class="float-right" v-if="isLogin">
        <el-dropdown @command="onDropdownClick" trigger="click" class="flex flex-align--middle">
          <Avatar :username="currentUser.username" :src="currentUser.avatar" :size="30"></Avatar>
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
    <el-dialog title="新的话题" :visible="isNewTopicVisible" :before-close="onBeforeClose" size="full">
      <NewTopic></NewTopic>
    </el-dialog>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar/dist/Avatar'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import NewTopic from '@/components/NewTopic'

export default {
  name: 'navbar',
  components: {
    Avatar,
    Signup,
    Login,
    NewTopic
  },
  methods: {
    onBeforeClose (done) {
      this.$store.commit('SWITCH_NEW_TOPIC_DIALOG', false)
      done()
    },
    onNewTopic () {
      this.isLogin ? this.$store.commit('SWITCH_NEW_TOPIC_DIALOG') : this.$store.commit('SWITCH_LOGIN_DIALOG', true)
    },
    onDropdownClick (cmd) {
      switch (cmd) {
        case 'logout':
          this.$store.dispatch('logout')
          break
        default:
          console.log('default')
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'isNewTopicVisible',
      'currentUser'
    ])
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

    .el-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
