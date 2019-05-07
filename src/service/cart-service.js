/*
* @Author: XiangYanfei
* @Date:   2019-05-06 20:04:58
* @Last Modified by:   XiangYanfei
* @Last Modified time: 2019-05-06 20:13:39
*/
var _mm=require('util/mm.js');

var _cart={
    //检查登录状态
    getCartCount:function(resolve,reject){
        _mm.request({
            url    :_mm.getServerUrl('/cart/get_cart_product_count.do'),
            success:resolve,
            error  :reject
        });
    },
}
module.exports=_cart;