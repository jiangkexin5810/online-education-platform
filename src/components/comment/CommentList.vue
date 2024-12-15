<template>
  <div class="comment-list">
    <h3 class="comment-title">课程评论 ({{ total }})</h3>
    
    <!-- 评论列表 -->
    <div v-if="comments.length" class="comment-items">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <div class="user-info">
            <img :src="comment.userAvatar" alt="用户头像" class="avatar">
            <span class="username">{{ comment.userName }}</span>
          </div>
          <span class="comment-time">{{ formatDate(comment.createTime) }}</span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      暂无评论，快来发表第一条评论吧！
    </div>

    <!-- 分页 -->
    <div v-if="total > pageSize" class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'

export default {
  name: 'CommentList',
  
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      comments: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },

  created() {
    this.fetchComments()
  },

  methods: {
    async fetchComments() {
      try {
        // TODO: 调用API获取评论列表
        // const { data } = await this.$api.comment.getComments({
        //   courseId: this.courseId,
        //   page: this.currentPage,
        //   pageSize: this.pageSize
        // })
        // this.comments = data.list
        // this.total = data.total

        // 临时模拟数据
        this.comments = [
          {
            id: 1,
            userName: '张三',
            userAvatar: 'https://placeholder.co/40',
            content: '课程讲解很详细，老师讲得很好！',
            createTime: '2024-12-15 10:30:00'
          },
          {
            id: 2,
            userName: '李四',
            userAvatar: 'https://placeholder.co/40',
            content: '通俗易懂，很适合入门学习。',
            createTime: '2024-12-14 15:20:00'
          }
        ]
        this.total = 2
      } catch (error) {
        console.error('获取评论列表失败:', error)
        this.$message.error('获取评论列表失败')
      }
    },

    handlePageChange(page) {
      this.currentPage = page
      this.fetchComments()
    },

    formatDate(date) {
      return formatDate(date)
    }
  }
}
</script>

<style scoped>
.comment-list {
  padding: 20px;
}

.comment-title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
}

.comment-items {
  margin-bottom: 20px;
}

.comment-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: 500;
  color: #333;
}

.comment-time {
  color: #999;
  font-size: 14px;
}

.comment-content {
  color: #666;
  line-height: 1.5;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 40px 0;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>