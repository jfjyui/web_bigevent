$(function() {
    //当点击登录页面的a链接，注册页面的div显示，登录页面div隐藏
    $('#link_reg').on('click', function() {
            $('.reg-box').show();
            $('.login-box').hide()
        })
        //当点击注册页面的a链接，登录页面的div显示，注册页面div隐藏
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义校验规则
    //1、从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //2、通过from.verify()函数自定义校验规则
    form.verify({
        //自定义一个密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //再次输入密码校验规则
        repwd: function(value) {
            //形参拿到的是确认密码框的内容
            //还需要拿到密码框的内容
            var pwd = $('.reg-box [name=password]').val();
            //进行判断内容是否一致
            if (pwd != value) {
                return '两次输入不一致'
            }
        }

    })

    //监听注册表单的提交事件

    $('#form_reg').on('submit', function(e) {

        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }

        //组织默认提交行为
        e.preventDefault();

        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            //模拟人的点击行为，注册完直接跳转到登录页面
            $('#link_login').click();
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {



        //组织默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                    // console.log(res.token);
                    //将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                    //登录成功后跳转到后台主页
                location.href = '/index.html'
            }

        })
    })
})