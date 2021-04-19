$(function() {
    var form = layui.form;
    var layer = layui.layer;

    //表单验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo();
    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            // headers就是请求头配置对象
            headers: {
                Authorization: localStorage.getItem('token') || ''

            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                //调用 form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            },
            complete: function(res) {
                //在该回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
                if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
                    //强制清空 token
                    localStorage.removeItem('token')
                        //强制跳转到登录页面
                    location.href = '/login.html'
                }
            }
        })
    }
    //重置行为
    //绑定重置按钮的点击事件
    $('#btnReset').on('click', function(e) {
        //阻止重置按钮的默认重置行为
        e.preventDefault();
        initUserInfo();

    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            // headers就是请求头配置对象
            headers: {
                Authorization: localStorage.getItem('token') || ''

            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')

                }
                layer.msg('更新信息成功');
                //调用父页面中的方法，重新渲染用户的头像和用户的信息
                // 调用index.js页面里的getUserInfo方法
                window.parent.getUserInfo();
            }
        })
    })
})