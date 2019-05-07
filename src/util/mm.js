/*
* @Author: xyf
* @Date:   2019-05-05 09:28:25
* @Last Modified by:   XiangYanfei
* @Last Modified time: 2019-05-06 19:36:20
*/
var conf={
    severhost: ''
};

var Hogan=require('hogan.js');

var _mm={

    //网络请求
    request:function(param){
        var _this = this;
        $.ajax({
            type     :param.method || 'get',
            url      :param.url||'',
            dataType :param.type||'json',
            data     :param.data||'',
            success:function(res){
                //请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if (1 === res.status) {
                   typeof param.error === 'function' && param.error(res.msg);
                }
            },
            erro:function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }

        });
    },

    // 统一登录处理
    doLogin:function(){
        window.location.href='./view/login.html?redirect=' + encodeURIComponent(window.location.href);
    },

    goHome:function(){
        window.location.href='./index.html';
    },

    //获取服务器地址
    getServerUrl:function(path){
        return conf.severhost+path;
    },

    // 获取url参数
    getUrlParam:function(name){ 
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
        var result = window.location.search.substr(1).match(reg); 
        return result ? decodeURIComponent(result[2]) : null;
    },

     //渲染html模版
    renderHtml:function(htmlTemplate,data){
        var template=Hogan.compile(htmlTemplate),
            result=template.render(data);
        return result;
    },

    //成功提示
    successTips:function(msg){
        alert(msg||'操作成功!');
    },

    //失败提示
    errorTips:function(msg){
        alert(msg||'操作失败!');
    },

    //字段验证：支持非空、手机、邮箱的判断
    validate:function (value,type) {
        var value=$.trim(value);
        //非空
        if('require'===type){
            return !!value;//将value强制转换为bool类型
        }
        if('phone'===type){
            return /^1\d{10}$/.test(value);
        }
        if('email'===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },

};

module.exports=_mm;