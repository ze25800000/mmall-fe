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
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function (res) {
            _this.filter(res);
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">找不到商品</p>');
        });
    },
    // 图片
    filter: function (data) {
        data.subImages = data.subImages.split(',');
    }
}
$(function () {
    page.init()
})