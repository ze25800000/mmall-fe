var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")}
        ]
    },
    plugins: [
        //提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //提取公共css，将打包好的文件放入css文件夹
        new ExtractTextPlugin("css/[name].css"),
    ]
};
module.exports = config;