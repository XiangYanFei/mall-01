/*
* @Author: XiangYanfei
* @Date:   2019-04-29 23:17:40
* @Last Modified by:   XiangYanfei
* @Last Modified time: 2019-05-06 22:47:12
*/
// require('../module.js');
// require('./index.css');

// //测试webpack 多入口 是否运行成功
// console.log('hello index');

// var $$ = require('jquery');
require('page/common/nav/index.js');
require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var navSide=require('page/common/nav-side/index.js');
var _mm=require('util/mm.js');

navSide.init({
    name:'pass-update'
});


//测试
// _mm.request({
//     // url:'./test.do',
//     // url:'http://www.happymmall.com/product/list.do?keyword=1',
//     url:'/product/list.do?keyword=1',
//     success:function(res){
//         console.log(res);
//     },
//     error:function(errMsg){
//         console.log(errMsg);
//     }
// })

//测试
// console.log(_mm.getUrlParam('test'));

//测试jquery是否引入
// $('body').html('index hello~~~~~~');

//测试Hogan
// var html='<div>{{data}}<div>';
// var data={
//     data:123
// }
// console.log(_mm.renderHtml(html,data));