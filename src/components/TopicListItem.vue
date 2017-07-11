<template>
  <section class="topic-list-item hover-background--gray">
    <transition>
      <router-link :to="{ name: 'topic-detail', params: { id: topic.objectId } }" class="flex">
        <Avatar :username="topic.author.username" :avatar="topic.author.avatar"></Avatar>
        <div class="topic">
          <el-row>
            <el-col class="flex flex-justify--between">
              <div>
                <p class="text-regular--small title" v-once>{{topic.title}}</p>

                <p class="text-assist--small fg-silver">
                  <span class="tags-left"><el-tag :class="{ 'fg-white': tag.hasOwnProperty('color') }" type="gray" v-for="(tag, index) in topic.tags" :key="index" :color="tag.color">{{tag.title}}</el-tag></span>
                  <i class="typcn typcn-arrow-back" v-once></i> {{topic.repliedAuthor.username}} {{repliedTimeAgo}}
                </p>
              </div>
              <div class="tags-right flex flex-align--baseline">
                <!-- <el-tag type="gray" v-for="(tag, index) in topic.tags" :key="index" :style="'background-color: ' + tag.color + '; color: #000;'">{{tag.title}}</el-tag> -->
                <el-tag type="gray" v-for="(tag, index) in topic.tags" :key="index" :color="tag.color">{{tag.title}}</el-tag>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="fg-silver--light" v-once>{{topic.content}}</el-col>
          </el-row>
        </div>
        <div class="reply-wrapper flex flex-direction--column flex-justify--center flex-align--middle">
          <el-badge :is-dot="isDot" :value="topic.repliedCount" class="reply-badge">
            <i class="typcn typcn-message"></i>
          </el-badge>
          <el-tag type="gray" class="reply-tag">{{topic.repliedCount}}</el-tag>
        </div>
      </router-link>
    </transition>

  </section>
</template>

<script>
import moment from 'moment'
import Avatar from '@/components/Avatar'

export default {
  name: 'topic-list-item',
  props: {
    topic: {
      type: Object,
      required: true,
      default: { author: { username: '' }, repliedCount: 0 }
    }
  },
  components: {
    Avatar
  },
  computed: {
    isDot () {
      return this.topic.repliedCount > 99
    },
    repliedTimeAgo () {
      // const d = new Date(this.topic.repliedAt.iso)
      // return d.toLocaleString()

      // console.log(typeof this.topic.repliedAt.iso)
      // const zoneOffset = 8
      // const offset = new Date().getTimezoneOffset() * 60 * 1000
      // const baseTime = new Date(this.topic.repliedAt.iso)
      // const d = new Date(baseTime + offset + zoneOffset * 60 * 60 * 1000)
      // return d.toString()
      // const d = new timezoneJS.Date(this.topic.repliedAt.iso, 'Asia/Shanghai')
      // console.log(d)
      if (!((this.topic || {}).repliedAt || {}).iso) { return '暂无回复' }
      moment.locale(['en-US', 'zh-CN'])
      const fromNow = moment(this.topic.repliedAt.iso).fromNow()
      return `回复于 ${fromNow}`
    }
  }
}
</script>

<style scoped lang="scss">

.topic-list-item {
  padding: 1em 0;

  .topic {
    .title {
      line-height: 1;
    }

    .tags-left {
      .el-tag {
        font-weight: 500;
        border: 0;
        border-radius: 0;

        &:first-child {
          border-radius: 4px 0 0 4px;
        }
        &:last-child {
          border-radius: 0 4px 4px 0;
        }
      }
    }

    .tags-right {
      white-space: nowrap;
      max-width: 10em;
      overflow: hidden;

      .el-tag {
        font-weight: 500;
        border: 0;
        border-radius: 0;

        &:first-child {
          border-radius: 4px 0 0 4px;
        }
        &:last-child {
          border-radius: 0 4px 4px 0;
        }
      }

      .tag {
        font-weight: 500;
        display: inline-block;
        padding: .1em .5em;
        box-sizing: border-box;

        &:first-child {
          border-radius: 4px 0 0 4px;
        }

        &:last-child {
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }

  .reply-wrapper {
    font-size: 1.167em;
    margin: 0 1.5em;
  }
}

@media screen and (max-width: 61.999em) {
  .tags-right, .reply-badge {
    display: none;
  }
}

@media screen and (min-width: 62em) {
  .tags-left, .reply-tag {
    display: none;
  }
}

</style>
