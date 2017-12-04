'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.str');
var templateProduct = require('./product-list.str');
var addressModal = require('./address-modal')

var page = {
    data: {
        selectedAddressId: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;
        // 地址的选择
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 订单的提交
        $(document).on('click', '.order-submit', function () {
            var shippingId = _this.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips('请选择地址后在提交');
            }
        });
        // 地址的添加
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList();
                }
            })
        });
    },
    // 加载地址列表
    loadAddressList: function () {
        var _this = this;
        _address.getAddressList(function (res) {
            var AddressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(AddressListHtml);
            _this.renderCart(res);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    // 加载商品清单
    loadProductList: function () {
        var _this = this;
        _order.getProductList(function (res) {
            var ProductListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(ProductListHtml);
            _this.renderCart(res);
        }, function (errMsg) {
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        });
    },
};
$(function () {
    page.init();
})