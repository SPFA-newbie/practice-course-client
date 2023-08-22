const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:4523/m1/2932975-0-default',
        target: 'http://127.0.0.1:8081',
        changOrigin: true,
        ws:false,
        pathRewrite: {
          '^/api': '' 
        }
      },
    }
  },
  transpileDependencies: true,
  lintOnSave: false
})
