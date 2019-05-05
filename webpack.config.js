const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig=function (name) {
    return {
        template:'./src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}

//webpack config
var config = {
    entry: {
        common:['./src/page/common/index.js'],
        index: ['./src/page/index/index.js'],
        login: ['./src/page/login/index.js']
    },

    devServer: {
        contentBase: './dist'
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
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
                test : /\.(gif|png|jpe?g|woff|svg|eot|ttf)$/, 
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
        ],

    },

};

module.exports = config;