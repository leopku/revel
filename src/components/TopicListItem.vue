<template>
  <section class="topic-list-item flex">
    <Avatar :username="topic.author.username" :avatar="topic.author.avatar"></Avatar>
    <div class="topic">
      <el-row>
        <el-col class="flex flex-justify--between">
          <div>
            <p class="text-regular title" v-once>{{topic.title}}</p>

            <p class="text-assist--small fg-silver">
              <span class="tags-left"><el-tag type="gray" v-for="(tag, index) in topic.tags" :key="index" :style="'background-color: ' + tag.color + ';'">{{tag.title}}</el-tag></span>
              <i class="typcn typcn-arrow-back" v-once></i> {{topic.author.username}} 回复于  天前
            </p>
          </div>
          <div class="tags-right flex flex-align--baseline">
            <el-tag type="gray" v-for="(tag, index) in topic.tags" :key="index" :style="'background-color: ' + tag.color + ';'">{{tag.title}}</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="fg-silver--light" v-once>{{topic.content}}</el-col>
      </el-row>
    </div>
    <div class="reply-wrapper flex flex-direction--column flex-justify--center flex-align--middle">
      <!-- <i class="typcn typcn-message"></i> {{topic.replyCount}} -->
      <el-badge :value="topic.replyCount" class="reply-badge">
        <i class="typcn typcn-message"></i>
      </el-badge>
      <el-tag type="gray" class="reply-tag">{{topic.replyCount}}</el-tag>
    </div>
  </section>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'topic-list-item',
  props: {
    topic: {
      type: Object,
      required: true,
      default: { author: { username: '' } }
    }
  },
  components: {
    Avatar
  },
  data () {
    return {
      //
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
