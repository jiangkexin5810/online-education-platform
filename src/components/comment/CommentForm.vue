<template>
    <div class="comment-form">
      <el-form :model="commentForm" :rules="rules" ref="commentForm">
        <el-form-item prop="content">
          <el-input
            v-model="commentForm.content"
            type="textarea"
            :rows="3"
            placeholder="请输入您的评论..."
          />
        </el-form-item>
        <el-form-item>
          <el-rate
            v-model="commentForm.rating"
            :rules="[{ required: true, message: '请选择评分' }]"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitComment">发表评论</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CommentForm',
    data() {
      return {
        commentForm: {
          content: '',
          rating: 0,
        },
        rules: {
          content: [
            { required: true, message: '请输入评论内容', trigger: 'blur' },
            { min: 5, message: '评论内容至少 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitComment() {
        this.$refs.commentForm.validate(valid => {
          if (valid) {
            this.$emit('submit', this.commentForm)
            this.resetForm()
          }
        })
      },
      resetForm() {
        this.commentForm = {
          content: '',
          rating: 0
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .comment-form {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  </style>