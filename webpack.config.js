const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig=function (name,title) {
    return {
        template :'./src/view/'+name+'.html',
        filename :'view/'+name+'.html',
        title    :title,
        inject   :true,
        hash     :true,
        chunks   :['common',name]
    }
}

//webpack config
var config = {
    entry: {
        common:['./src/page/common/index.js'],
        index: ['./src/page/index/index.js'],
        login: ['./src/page/login/index.js'],
        result: ['./src/page/result/index.js']
    },

    //配置别名
    resolve:{
      alias:{
        node_modules:path.resolve(__dirname, 'node_modules/'),
        util        :path.resolve(__dirname, 'src/util/'),
        page        :path.resolve(__dirname,'src/page/'),
        service     :path.resolve(__dirname,'src/service/'),
        image       :path.resolve(__dirname,'src/image/')
      }
    },

    devServer: {
       contentBase: path.join(__dirname, 'dist'),
       port: 8080,
       inline: true,
       proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
       }
    },

    output:{
        path: path.resolve(__dirname, "dist"), 
        filename:'js/[name].js',
        publicPath: '/'
    },

    externals:{
        'jquery':'window.jquery'
    },

    plugins:[
    //独立通用模块到base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
              // ( 公共chunk(commnons chunk) 的名称)
            filename: "js/base.js",//基于output.path
        }),

    //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),

    //html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')), 
    ],

     module: {
        rules:[
            { 
                test : /\.css$/, //寻找css结尾的文件
                use : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

            { 
                test : /\.(gif|png|jpe?g|woff|svg|eot|ttf|woff2)$/, 
                use: [
                {
                    loader: 'file-loader',
                    options:{
                        name:'resource/[name].[ext]',
                        limit:1000
                    }
                }
                ]
            },

            { 
                test : /\.string$/, 
                use: [
                {
                    loader: 'html-loader',
                }
                ]
            },

        ],

    },

    

};

module.exports = config;