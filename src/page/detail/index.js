require('./index.css')
require('page/common/header/index')
require('page/common/nav/index')
var _mm = require('util/mm.js');
var _product = require('service/product-service')
var _cart = require('service/cart-service')
var templateIndex = require('./index.str')


var page = {
    data: {
        productId: _mm.getUrlParam('productId') || '',
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        // 如果没有productId自动回首页
        if (!this.data.productId) {
            _mm.goHome()
        }
        this.loadDetail();
    },
    bindEvent: function () {
    },
    //加载detail数据
    loadDetail: function () {
    }
}
$(function () {
    page.init()
})