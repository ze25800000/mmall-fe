require('./index.css')
require('page/common/header/index')
require('page/common/nav/index')
var navSide = require('page/common/nav-side/index')
var _mm = require('util/mm.js');
var _order = require('service/order-service')
var templateIndex = require('./index.str')
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    bindEvent: function () {

    },
    loadDetail: function () {
        var _this = _this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        })
    }
};
$(function () {
    page.init()
});