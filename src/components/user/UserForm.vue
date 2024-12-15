<template>
  <div class="user-form">
    <h2>{{ isEdit ? '编辑用户' : '创建用户' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-item">
        <label>用户名：</label>
        <input 
          v-model="formData.username"
          type="text"
          required
          placeholder="请输入用户名"
        >
      </div>
      
      <div class="form-item">
        <label>邮箱：</label>
        <input 
          v-model="formData.email"
          type="email"
          required
          placeholder="请输入邮箱"
        >
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? '提交中...' : '提交' }}
        </button>
        <button type="button" @click="$router.push('/users')">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createUser, updateUser, getUserDetail } from '../api/user'

export default {
  name: 'UserForm',
  props: {
    id: {
      type: [Number, String],
      required: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        email: ''
      },
      loading: false,
      isEdit: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      try {
        if (this.isEdit) {
          await updateUser(this.id, this.formData)
        } else {
          await createUser(this.formData)
        }
        this.$router.push('/users')
      } catch (error) {
        console.error('提交失败:', error)
        alert('操作失败，请重试')
      } finally {
        this.loading = false
      }
    },
    
    async fetchUserData() {
      if (!this.id) return
      
      try {
        const response = await getUserDetail(this.id)
        this.formData = response.data
      } catch (error) {
        console.error('获取用户数据失败:', error)
        alert('获取用户数据失败')
      }
    }
  },
  created() {
    this.isEdit = !!this.id
    if (this.isEdit) {
      this.fetchUserData()
    }
  }
}
</script>

<style scoped>
.user-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
.form-item {
  margin-bottom: 15px;
}
.form-item label {
  display: block;
  margin-bottom: 5px;
}
.form-item input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button[type="submit"] {
  background-color: #007bff;
  color: white;
}
button[type="submit"]:hover {
  background-color: #0056b3;
}
button[type="button"] {
  background-color: #6c757d;
  color: white;
}
button[type="button"]:hover {
  background-color: #5a6268;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>