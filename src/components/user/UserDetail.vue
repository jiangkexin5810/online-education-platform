<template>
  <div class="user-detail">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="userDetail" class="detail-content">
      <h2>用户详情</h2>
      <div class="detail-item">
        <label>ID:</label>
        <span>{{ userDetail.id }}</span>
      </div>
      <div class="detail-item">
        <label>用户名:</label>
        <span>{{ userDetail.username }}</span>
      </div>
      <div class="detail-item">
        <label>邮箱:</label>
        <span>{{ userDetail.email }}</span>
      </div>
      
      <button @click="$router.push('/users')">返回列表</button>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from '../api/user'

export default {
  name: 'UserDetail',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      userDetail: null,
      loading: false,
      error: null
    }
  },
  methods: {
    async fetchUserDetail() {
      this.loading = true
      this.error = null
      try {
        const response = await getUserDetail(this.id)
        this.userDetail = response.data
      } catch (error) {
        this.error = '获取用户详情失败'
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.fetchUserDetail()
  },
  watch: {
    id: {
      handler: 'fetchUserDetail',
      immediate: true
    }
  }
}
</script>

<style scoped>
.user-detail {
  padding: 20px;
}
.detail-content {
  max-width: 600px;
  margin: 0 auto;
}
.detail-item {
  margin: 15px 0;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.detail-item label {
  font-weight: bold;
  margin-right: 10px;
  min-width: 80px;
  display: inline-block;
}
.loading {
  text-align: center;
  padding: 20px;
}
.error {
  color: red;
  text-align: center;
  padding: 20px;
}
button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>