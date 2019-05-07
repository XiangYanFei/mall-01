/*
* @Author: xyf
* @Date:   2019-05-07 10:39:13
* @Last Modified by:   xyf
* @Last Modified time: 2019-05-07 11:26:50
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm  =require('util/mm.js');

$(function(){
    var type=_mm.getUrlParam('type') || 'default',
        $element=$('.'+type+'-success');

    //显示对应的提示元素
    $element.show();

    // if()
})
