import { commentApi } from '@/api/comment'

const state = {
  comments: [],
  total: 0,
  loading: false,
}

const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  ADD_COMMENT(state, comment) {
    state.comments.unshift(comment)
    state.total++
  }
}

const actions = {
  // 获取评论列表
  async fetchComments({ commit }, { courseId, params }) {
    commit('SET_LOADING', true)
    try {
      const { data } = await commentApi.getComments(courseId, params)
      commit('SET_COMMENTS', data.items)
      commit('SET_TOTAL', data.total)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // 创建评论
  async createComment({ commit }, { courseId, data }) {
    const response = await commentApi.createComment(courseId, data)
    commit('ADD_COMMENT', response.data)
    return response.data
  },

  // 删除评论
  async deleteComment({ commit, state }, commentId) {
    await commentApi.deleteComment(commentId)
    const comments = state.comments.filter(c => c.id !== commentId)
    commit('SET_COMMENTS', comments)
    commit('SET_TOTAL', state.total - 1)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}