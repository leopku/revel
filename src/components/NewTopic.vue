<template>
  <el-dialog title="新的话题" :visible="isNewTopicVisible" :before-close="onBeforeClose">
    <el-form v-model="topic">
      <el-form-item>
        <el-input v-model="topic.title" placeholder="话题标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="topic.tags" multiple filterable="" allow-create class="full--width" placeholder="请选择问题标签">
          <el-option v-for="tag in tags" :key="tag.objectId" :label="tag.title" :value="tag.objectId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <mavon-editor v-model="topic.markdown" :subfield="false" :toolbars="toolbars" @change="onEditorChange" :ishljs="true"></mavon-editor>
      </el-form-item>
    </el-form>
    <el-button :loading="topicLoading" @click="onNewTopicClick" type="primary" class="full--width">提交话题</el-button>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/util'
import {SWITCH_NEW_TOPIC_DIALOG} from '@/store/mutation-types'

export default {
  name: 'new-topic',
  data () {
    return {
      options5: [
        { value: 'HTML', lable: 'HTML' },
        { value: 'CSS', label: 'CSS' },
        { value: 'JavaScript', label: 'JavaScript' }
      ],
      value10: [],
      // tags: [],
      topic: {
        title: '',
        tags: [],
        markdown: '',
        content: ''
      }
    }
  },
  methods: {
    onBeforeClose (done) {
      this.$store.commit(SWITCH_NEW_TOPIC_DIALOG, false)
      done()
    },
    onNewTopicClick () {
      this.isNewTopicVisible = true
      if (this.topic.markdown.trim().length === 0) {
        this.$message({
          message: '指令貌似是空的',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('create_topic', this.topic)
        .then(response => console.log(response))
    },
    onEditorChange (markdown, html) {
      // this.topic.markdown = markdown
      this.topic.content = html
    }
  },
  // mounted () {
  //   const tags = this.$store.getters.tags
  //   this.tags = tags.map(tag => {
  //     return { value: tag.objectId, label: tag.title }
  //   })
  // },
  computed: {
    ...mapGetters([
      'isNewTopicVisible',
      'topicLoading',
      'tags'
      // 'toolbars'
    ]),
    toolbars () {
      let toolbars = deepCopy(this.$store.getters.toolbars)
      toolbars['help'] = false
      return toolbars
    }
  }
}
</script>
