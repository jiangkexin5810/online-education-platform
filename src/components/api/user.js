import axios from 'axios'

// 设置基础URL
const baseURL = 'http://localhost:8081/api'

// 获取用户列表
export function getUserList() {
  return axios.get(`${baseURL}/users`)
}

// 获取单个用户详情
export function getUserDetail(id) {
  return axios.get(`${baseURL}/users/${id}`)
}

// 创建用户
export function createUser(data) {
  return axios.post(`${baseURL}/users`, data)
}

// 更新用户
export function updateUser(id, data) {
  return axios.put(`${baseURL}/users/${id}`, data)
}

// 删除用户
export function deleteUser(id) {
  return axios.delete(`${baseURL}/users/${id}`)
}