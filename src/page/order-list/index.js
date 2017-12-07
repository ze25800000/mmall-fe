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
            name: 'order-list'
        });
    }
};
$(function () {
    page.init()
});