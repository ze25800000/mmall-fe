require('./index.css')
require('page/common/header/index')
require('page/common/nav/index')
var navSide = require('page/common/nav-side/index')
var _mm = require('util/mm.js');
var _user = require('service/user-service')
var templateIndex = require('./index.str')
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            };
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                //更改用户信息
                _user.updateUserInfo(userInfo, function (res, msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html'
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                });
            } else {
                _mm.errorTips(validateResult.msg)
            }
        })
    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        });
    },
    // 验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
        1
    }
};
$(function () {
    page.init()
});