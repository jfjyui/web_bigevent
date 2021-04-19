$(function() {
    var form = layui.form;
    var layer = layui.layer;
    //定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //新密码设定规则，不能与原密码一样
            samepwd: function(value) {
                if (value === $('[name=oldPwd]').val()) {
                    return '新旧密码不能相同'


                }
            },

            //确认新密码设定规则，新密码跟确认新密码得保持一致
            repwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码不一致'
                }
            }
        })
        //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/updatepwd',
            data: $(this).serialize(),
            // headers就是请求头配置对象
            headers: {
                Authorization: localStorage.getItem('token') || ''

            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！');

                //重置表单,$('.layui-form')[0]将jquery元素转换成原生的dom元素，并进行重置
                $('.layui-form')[0].reset()
            }
        })
    })

})