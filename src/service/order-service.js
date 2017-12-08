var _mm = require('util/mm');
var _order = {
    // 获取商品信息
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    getAddressList: function () {

    },
    // 提交订单
    createOrder: function (orderInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    // 获取订单列表
    getOrderList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    }
};
module.exports = _order;