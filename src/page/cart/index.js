require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.str');

var page = {
    data: {},
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadCart();
    },
    bindEvent: function () {
    },
    // 加载购物车信息
    loadCart: function () {
        var _this = this;
        // 获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            $('.page-wrap').html('<p class="err-tip">错误</p>')
        });
    },
    // 数据匹配
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 渲染购物车
    renderCart: function (data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        // 生成HTML
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
    }
};
$(function () {
    page.init();
})