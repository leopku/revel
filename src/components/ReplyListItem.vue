<template>
  <section class="reply-list-item" :id="`reply-list-item-${reply.objectId}`">
    <el-card class="body-style" v-observe-visibility="visibilityChanged">
    <transition name="fade">
    <div v-show="isVisible">
      <!-- <div slot="header" class="flex"> -->
      <div class="flex">
        <Avatar :username="reply.author.username" :src="reply.author.avatar"></Avatar>
        <div style="margin-left: 1em;">
          <div class="text-regular font-weight--500">
            {{reply.author.username}}
            <CertIcon v-if="reply.author.valuedTag"></CertIcon>
            <CertIcon wrapper-color="blue" inner-icon="tick" v-if="reply.author.isOrg"></CertIcon>
          </div>

          <div>
            <span v-if="reply.author.sign"><i class="typcn typcn-document-text mini-icon"></i>{{reply.author.sign}}</span>
            <!-- <span v-if="reply.author.sign && reply.author.valuedTag">&nbsp;|&nbsp;</span> -->
            <span v-if="reply.author.valuedTag">
              <i class="typcn typcn-spiral mini-icon"></i>
              <span class="font-kai" v-for="tag in reply.author.valuedTag">{{tag}} </span>话题优秀回答者
            </span>
          </div>
        </div>
      </div>
      <!-- <transition name="bounce"> -->
        <div v-shave="{height: shaveHeight, spaces: false}" class="font-song text-regular--small box-body" v-show="hasShaved">
          <div v-html="reply.content"></div>
        </div>

      <!-- </transition> -->
      <div class="font-song text-regular--small box-body" v-show="!hasShaved">
        <div v-html="reply.content"></div>
      </div>
      <div class="bottom actions flex flex-justify--between">
        <div class="actions-left--wrapper">
          <el-button size="mini" @click="onUpVoteClick"><i class="typcn typcn-thumbs-up"></i> <span>{{reply.upVotedCount}}</span></el-button>
          <el-button size="mini"><i class="typcn typcn-thumbs-down"></i></el-button>
          <el-button type="text" size="mini"><i class="typcn typcn-messages"></i> <span>10 条</span></el-button>
          <el-button type="text" size="mini"><i class="typcn typcn-export-outline"></i> 分享</el-button>
          <el-button type="text" size="mini"><i class="typcn typcn-bookmark"></i> 收藏</el-button>
          <el-button type="text" size="mini"><i class="typcn typcn-coffee"></i> 感谢</el-button>
          <el-button type="text" size="mini"><i class="typcn typcn-weather-stormy"></i> 举报</el-button>
        </div>
        <div class="actions-right-wrapper">
          <el-button type="text" size="mini" @click="hasShaved = !hasShaved" v-show="hasShaved">阅读全文 <i class="typcn typcn-arrow-down-outline"></i></el-button>
          <el-button type="text" size="mini" @click="hasShaved = !hasShaved" v-show="!hasShaved">收起 <i class="typcn typcn-arrow-up-outline"></i></el-button>
        </div>
      </div>
    </div>
    </transition>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar/dist/Avatar'
import CertIcon from '@/components/CertIcon'

export default {
  name: 'reply-list-item',
  props: {
    reply: {
      type: Object,
      require: true,
      default: () => []
    }
  },
  data () {
    return {
      markdown: '',
      isVisible: false,
      hasShaved: true,
      shaveHeight: 190
    }
  },
  components: {
    CertIcon,
    Avatar
  },
  methods: {
    onUpVoteClick () {
      if (!this.isLogin) {
        this.$store.commit('SWITCH_LOGIN_DIALOG', true)
      }
    },
    visibilityChanged (isVisible, entry) {
      this.isVisible = isVisible
      // console.log(this.reply.objectId + 'Visibility Changed')
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  }
}
</script>

<style scoped lang="scss">
.reply-list-item {
  margin: 1em 0;
}

.body-style {
  border-width: 0;
  border-bottom-width: 1px;
  border-bottom-color: rgba(209,219,229,.3);
  box-shadow: 0 0 0 0 transparent;

  .box-body {
    margin: 1em 0;
  }

  .actions {
    .el-button+.el-button {
      margin-left: 3px;
    }

    .el-button {
      i {
        font-size: .8em;
      }

      span {
        font-size: 1.2em
      }
    }
  }
}

.el-card {
  &:last-child {
    border-bottom-width: 1px;
  }

  .el-card__header {
    border-bottom-width: 0;
  }
}

</style>
