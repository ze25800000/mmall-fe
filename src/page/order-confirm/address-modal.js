'use strict';
var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _cities = require('util/cities/index.js')
var templateAddressModel = require('./address-modal.str');

var addressModal = {
    show: function (option) {
        this.option = option;
        this.$modalWrap = $('.modal-wrap')
        // 渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    loadModal: function () {
        var addressModalHtml = _mm.renderHtml(templateAddressModel, this.option.data)
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();
        // 加载城市
        this.loadCities();
    },
    bindEvent: function () {
        var _this = this;
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        })
    },
    // 加载省份
    loadProvince: function () {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
    },
    // 获取select框的选项
    getSelectOption: function (optionArr) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArr.length; i < length; i++) {
            html += '<option value="' + optionArr[i] + '">' + optionArr[i] + '</option>';
        }
        return html;
    },
    // 加载城市
    loadCities: function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
    },
    hide: function () {

    }
};
module.exports = addressModal;