var _mm = require('util/mm');
var _order = {
    // 获取商品信息
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    }
};
module.exports = _order;