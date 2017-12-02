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

    }
};
module.exports = _order;