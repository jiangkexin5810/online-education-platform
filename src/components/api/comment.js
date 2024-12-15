import http from './http'

export const commentApi = {
  // 获取评论列表
  getComments(courseId, params) {
    return http.get(`/api/courses/${courseId}/comments`, { params })
  },
  
  // 创建评论
  createComment(courseId, data) {
    return http.post(`/api/courses/${courseId}/comments`, data)
  },
  
  // 删除评论
  deleteComment(commentId) {
    return http.delete(`/api/comments/${commentId}`)
  },
  
  // 更新评论
  updateComment(commentId, data) {
    return http.put(`/api/comments/${commentId}`, data)
  }
}