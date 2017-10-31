var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置 dev /online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}
var config = {
    //使用对象配置多入口文件
    entry: {
        // common是公共模块文件，跟公共模块插件name同属性即可
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        // 使用[name]显示原入口文件的名字，支持路径
        filename: 'js/[name].js'
    },
    // 加载外部变量模块，'window.jQuery'要加引号
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        // 处理css
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
        ]
    },
    plugins: [
        //提取公共模块，将独立通用模块放到js/base.js中
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //提取公共css，将打包好的文件放入css文件夹
        new ExtractTextPlugin("css/[name].css"),
        // HTML模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;