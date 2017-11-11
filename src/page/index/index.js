'use strict'
require('./index.css')
require('page/common/header/index')
require('page/common/nav/index')
require('util/slider/index')
var templateBanner = require('./index.str')
var _mm = require('util/mm.js');
$(function () {
    // 渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    $('.banner').unslider({
        dots: true
    });
    //前一张和后一张事件操作
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $('.slider').data('unslider')[forward]();
    })
});