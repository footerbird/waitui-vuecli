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
//            target: 'http://www.waitui.com/mobile/Index_controller',
              target: 'http://132.232.212.128/mobile/Index_controller',
              changeOrigin: true//是否跨域
          }
        }
    }
}