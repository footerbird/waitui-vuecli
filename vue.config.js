module.exports = {
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: [
                {name: 'vux-ui'},
                {name: 'duplicate-style'}
            ]
        })
    },
    devServer: {
        proxy: {//代理
          '/api': {
              target: 'http://www.waitui.com/mobile/Index_controller',
              ws: true,
              changeOrigin: true,//是否跨域
              pathRewrite: {
                  '^/api' : ''// rewrite path
              }
          }
        }
    }
}