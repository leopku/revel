<template>
  <div>
    <el-form :model="topic" :rules="rules" ref="topicForm" label-width="50px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="topic.title" placeholder="话题标题"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="topic.tags" multiple filterable="" allow-create class="full--width" placeholder="请选择话题标签">
          <el-option v-for="tag in tags" :key="tag.objectId" :label="tag.title" :value="tag.objectId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="markdown">
        <mavon-editor v-model="topic.markdown" :subfield="false" :toolbars="toolbars" @change="onEditorChange" :ishljs="true" placeholder="这里编写指令，预览点击右上角「眼睛」图标或按「F9」"></mavon-editor>
      </el-form-item>
    </el-form>
    <el-button :loading="topicLoading" @click="onNewTopicSubmit('topicForm')" type="primary" class="full--width">提交话题</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Lazy from 'lazy.js'
import { deepCopy } from '@/util'

export default {
  name: 'new-topic',
  data () {
    return {
      topic: {
        title: '',
        tags: [],
        markdown: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入话题标题', trigger: 'blur' },
          { min: 3, max: 255, message: '长度不能短于 3', trigger: 'blur' }
        ],
        tags: [
          { type: 'array', required: true, message: '请选择话题标签', trigger: ['blur', 'change'] }
        ],
        markdown: [
          { required: true, message: '请填写指令', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onNewTopicSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message({
            message: '指令不完整的',
            type: 'warning'
          })
          return false
        }
        this.$store.dispatch('create_topic', this.topic)
          .then(response => {
            const copy = deepCopy(this.topic)
            copy.author = this.currentUser
            copy.objectId = response.objectId
            copy.tags = []

            Lazy(this.tags).filter(tag => this.topic.tags.indexOf(tag.objectId) >= 0)
              .each(tag => copy.tags.push(tag))
            this.$store.commit('SHIFT_NEW_TOPIC', copy)
            this.$refs[formName].resetFields()
          })
      })
    },
    onEditorChange (markdown, html) {
      this.topic.content = html
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'topicLoading',
      'tags'
    ]),
    toolbars () {
      let toolbars = deepCopy(this.$store.getters.toolbars)
      toolbars['help'] = false

      return toolbars
    }
  }
}
</script>
