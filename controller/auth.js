module.exports = app => ({
    /**
     * 登录
     * @returns {Promise<void>}
     */

    async login() {
        const { ctx, $service, $helper } = app;
        const { username, password } = ctx.request.body;
        console.log($service)
        //验证数据库是否存在
        let user = await $service.user.getUsersByUsername(username);
        if (!user) {
            $helper.returnBody(false, {}, '用户不存在');
            return;
        }

        //校验密码
        const userCurrentPassword = await $service.user.getUsersByUsernameCompare(username);
        const verifyPass = await $helper.verifyPassword(password, userCurrentPassword.password);
        if (!verifyPass) {
            $helper.returnBody(false, '', "密码错误，请重试!");
            return;
        }

        user=user
    }
})