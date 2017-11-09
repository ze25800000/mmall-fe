require('./index.css')
require('page/common/header/index')
require('page/common/nav/index')
var navSide = require('page/common/nav-side/index')
var _mm = require('util/mm.js');
var _user = require('service/user-service')
var templateIndex = require('./index.str')
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        });
    }
};
$(function () {
    page.init()
});