<template>
  <div class="user-list">
    <div class="actions">
      <button @click="$router.push('/users/create')" class="add-button">
        添加用户
      </button>
    </div>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="users.length" class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td class="actions-cell">
            <router-link :to="`/users/${user.id}`" class="view-link">
              查看
            </router-link>
            <button @click="$router.push(`/users/${user.id}/edit`)" class="edit-button">
              编辑
            </button>
            <button @click="handleDelete(user.id)" class="delete-button">
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-else-if="!loading" class="no-data">
      暂无用户数据
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser } from '../api/user'

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await getUserList()
        this.users = response.data
      } catch (error) {
        this.error = '获取用户列表失败'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    
    async handleDelete(id) {
      if (!confirm('确定要删除该用户吗？')) return
      
      try {
        await deleteUser(id)
        await this.fetchUsers()
      } catch (error) {
        console.error('删除失败:', error)
        alert('删除失败，请重试')
      }
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style scoped>
.user-list {
  padding: 20px;
}
.actions {
  margin-bottom: 20px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
.user-table th {
  background-color: #f5f5f5;
}
.actions-cell {
  display: flex;
  gap: 10px;
}
.view-link,
.edit-button,
.delete-button {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}
.view-link {
  background-color: #17a2b8;
  color: white;
}
.edit-button {
  background-color: #ffc107;
  border: none;
  color: #000;
}
.delete-button {
  background-color: #dc3545;
  border: none;
  color: white;
}
.add-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.loading,
.error,
.no-data {
  text-align: center;
  padding: 20px;
}
.error {
  color: red;
}
button:hover {
  opacity: 0.8;
}
</style>