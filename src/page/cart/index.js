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
        var _this = this;
        $(document).on('click', '.cart-select', function () {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // 切换选中状态
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            } else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            }
        });
        // 全选/非全选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            // 切换选中状态
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            } else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            }
        });
        // 商品数量的变化
        $(document).on('click', '.count-btn', function () {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _mm.errorTips('该商品数量达到上限');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            }
            // 购物车商品数量
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (errMsg) {
                _this.showCartError(errMsg);
            });
        });
        //删除单个商品
        $(document).on('click', '.cart-delete', function () {
            if (window.confirm('你确认要删除该商品？')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.delectCartProduct(productId);
            }
        })
    },
    // 加载购物车信息
    loadCart: function () {
        var _this = this;
        // 获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError(errMsg);
        });
    },
    // 数据匹配
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 删除指定商品，支持批量，productId用逗号分隔
    delectCartProduct: function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError(errMsg);
        })
    },
    // 渲染购物车
    renderCart: function (data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        // 生成HTML
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
    },
    showCartError: function (err) {
        $('.page-wrap').html('<p class="err-tip">' + err + '</p>');
    }
};
$(function () {
    page.init();
})