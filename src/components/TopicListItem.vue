<template>
  <section class="topic-list-item flex">
    <div class="avatar"><span class="avatar-inner bg--mediumturquoise text-regular--big" v-if="!repliedBy.avatar">{{ repliedBy.username | firstAndCapitalize }}</span>
    <img v-if="repliedBy.avatar" class="avatar-inner bg--mediumturquoise text-regular--big" src="http://discuss.flarum.org.cn/assets/avatars/rincefsd6hquwsvx.jpg" alt=""></div>
    <div class="topic">
      <el-row>
        <el-col class="flex flex-justify--between">
          <div>
            <p class="text-regular title">{{topic.title}}</p>

            <p class="text-assist--small fg-silver">
              <span class="tags-left"><el-tag type="gray" v-for="(tag, index) in topic.tags" :key="index" :class="tag.cls">{{tag.title}}</el-tag></span>
              <i class="typcn typcn-arrow-back"></i> {{topic.repliedBy.username}} 回复于 {{topic.repliedAt}} 天前
            </p>
          </div>
          <div class="tags-right flex flex-align--baseline">
            <el-tag type="gray" v-for="(tag, index) in topic.tags" :key="index" :class="tag.cls">{{tag.title}}</el-tag>
            <!-- <span class="tag" v-for="(tag, index) in topic.tags" :key="index" :class="tag.colorCls">{{tag.title}}</span> -->
            <!-- <span class="tag bg--orange fg-white">求助</span>
            <span class="tag bg-gray--extra">开发</span> -->
            <!-- <span class="tag bg-gray--extra">开发</span>
            <span class="tag bg-gray--extra">开发</span>
            <span class="tag bg-gray--extra">开发</span> -->
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="fg-silver--light">{{topic.content}}</el-col>
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
export default {
  name: 'topic',
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      repliedBy: this.topic.repliedBy
    }
  }
}
</script>

<style scoped lang="scss">

.topic-list-item {
  // white-space: nowrap;
  padding: 1em 0;

  .avatar {
    margin: 0 .8em;

    .avatar-inner {
      color: #fff;
      display: inline-block;
      box-sizing: content-box;
      text-align: center;
      vertical-align: center;
      font-weight: normal;
      line-height: 2em;

      height: 2em;
      width: 2em;
      border-radius: 2em;
    }
  }

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
      max-width: 98px;
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
