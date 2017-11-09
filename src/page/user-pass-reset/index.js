require('./index.css');
require('page/common/nav-simple/index.css');
var _user = require('service/user-service');
var _mm = require('util/mm');
var formError = {
    //表单里的错误提示
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        // 输入用户名后下一步按钮的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            // 判断用户名存在
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入用户名')
            }
        });
        // 输入用户名后下一步按钮的点击
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            // 判断答案是否存在
            if (answer) {
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入密码提示问题答案');
            }
        });
        // 输入新密码
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            // 判断为空
            if (password && password.length >= 6) {
                // 检查密码提示问题答案
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset'
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        // 表单验证结果
        validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.login(formData, function (res) {
                // window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            })
        } else {
            formError.show(validateResult.msg);
        }
    },
    // 表单验证的验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    // 加载输入用户名
    loadStepUsername: function () {
        $('.step-username').show();
    },
    // 加载输入密码提示答案
    loadStepQuestion: function () {
        formError.hide();
        $('.step-username')
            .hide()
            .siblings('.step-question')
            .show()
            .find('.question')
            .text(this.data.question);

    },
    // 加载输入新密码
    loadStepPassword: function () {
        formError.hide();
        $('.step-question')
            .hide()
            .siblings('.step-password')
            .show();
    }
};
$(function () {
    page.init()
});