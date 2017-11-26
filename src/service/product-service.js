var _mm = require('util/mm');
var _product = {
    //用户登录
    getProductList: function (listParam, resolve, reject) {
        // 获取商品信息
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    }
};
module.exports = _product;