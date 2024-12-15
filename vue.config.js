const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,  // 修改为新的端口号
    proxy: {
      '/api': {  // 添加代理配置，用于连接后端服务
        target: 'http://localhost:8080',  // 后端服务地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})