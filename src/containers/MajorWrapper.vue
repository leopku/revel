<template>
  <section id="major-wrapper" class="major-wrapper">
        <el-row>
          <el-col :span="23" class="major">
            <div class="major-inner flex flex-justify--between">
              <el-cascader
                :options="options"
                size="small"
                v-model="selectedOptions"
                @change="onChange" id="sortSelect">
              </el-cascader>
              <div class="button-flat bg-gray--light flex flex-justify--center flex-align--middle"><i class="typcn typcn-arrow-sync"></i></div>
            </div>
          </el-col>
          <el-col :span="23" class="topics">
            <TopicListItem v-for="(topic, index) in topics" :topic="topic" :key="index">{{topic.title}}</TopicListItem>
          </el-col>
        </el-row>
  </section>
</template>

<script>
import TopicListItem from '@/components/TopicListItem'

export default {
  name: 'major-wrapper',
  components: {
    TopicListItem
  },
  data () {
    return {
      options: [{
        value: 'latest',
        label: '最新回复'
      },
      {
        value: 'top',
        label: '热门话题'
      },
      {
        value: 'newest',
        label: '近期话题'
      },
      {
        value: 'oldest',
        label: '历史话题'
      }],
      selectedOptions: ['latest'],
      topics: [{
        objectId: 'BTNqRdpwFR',
        title: 'Revel 的故事：我为什么要开发 Revel',
        content: '德洛丽丝也瞬间明白到，一切早已物是人非。或许这就是人类和人造人的区别，德洛丽丝哭了。她不是为自己哭，而是为威廉哭，她看着威廉脸上那些岁月的痕迹，她知道自己赢了。人类终究敌不过生老病死，而德洛丽丝，和其他人造人，将会永恒。',
        tags: [{
          title: '美剧',
          cls: 'bg--orange fg-white'
        },
        {
          title: '西部世界'
        }],
        repliedBy: { username: 'leopku', avatar: 'http://discuss.flarum.org.cn/assets/avatars/rincefsd6hquwsvx.jpg' },
        repliedAt: 16,
        replyCount: 99
      },
      {
        objectId: 'EihPeYsBqo',
        title: 'Revel 的故事：我为什么要开发 Revel',
        content: '梅芙在赫托克和蛇纹女的掩护下，终于搭乘了离开西部世界的电梯。菲利克斯最后给了她之前要求查找的她女儿的地址。梅芙接过写有地址的纸张，犹豫了一下。她突然释然了，因为她不是自己的女儿，自己也不是母亲。然而，在她踏上列车时，被眼前的一个景象触动了。她看见一对母女在谈笑风生，这是她向往的生活。梅芙毅然决定回去西部世界，她要找到自己的女儿，组建家庭，成为一个真正的人。',
        tags: [{
          title: '美剧',
          cls: 'bg--orange fg-white'
        },
        {
          title: '西部世界'
        },
        {
          title: '接待员'
        },
        {
          title: '梅芙'
        }],
        repliedBy: { username: 'leopku' },
        repliedAt: 16,
        replyCount: 99
      }]
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
.major {
  padding: 1.25em 0;
  // margin-top: 1.25em;

  .el-cascader {
    .el-input {
      .el-input__inner {
        height: 2.9em;
        min-height: 2.9em;
        background-color: #E5E9F2;

        border-width: 0;
      }
    }

    .el-cascader__label {
      color: #48576a;
      margin-top: 5px;
    }
  }

}

.button-flat {
  height: 3.167em;
  width: 3.167em;
  border-radius: 4px;

  i {
    font-size: 1.3em;
  }
}
</style>
