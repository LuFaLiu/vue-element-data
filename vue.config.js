const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'Vue Element Data' // Page title
module.exports = {
  publicPath: '../', 
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false, 
  productionSourceMap: false,
  devServer: {
    port: 8089,
    proxy: { 
      '/dev': {
        target: process.env.VUE_APP_BASE_API, // dev 
        changeOrigin: true,
        open: true,
        pathRewrite: {
          '^/dev': '/dev'
        }
      },
      '/prod': {
        target: process.env.VUE_APP_BASE_API, // prod
        changeOrigin: true,
        open: true,
        pathRewrite: {
          '^/prod': '/prod'
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }

}
