module.exports = app => ({
    /**
     * 登录
     * @returns {Promise<void>}
     */

    async login() {
        const { ctx, service, helper } = app;
        const { username, password } = ctx.request.body;
        //验证数据库是否存在
        let user = await service.user.getUsersByUsername(username);
        if (!user) {
            helper.returnBody(false, {}, '用户不存在');
            return;
        }

        //校验密码
        try {
            // 数据解密
            const decryptPassword = await helper.decryptData(password);

            const userCurrentPassword = await service.user.getUsersPasswordByUsername(username);
            const verifyPass = await helper.verifyPassword(decryptPassword, userCurrentPassword.password);
            if (!verifyPass) {
                helper.returnBody(false, '', "密码错误，请重试!");
                return;
            }
        } catch (err) {
            helper.returnBody(false, '', err);
            return;
        }


        user = user.toObject();
        let userDataStr = JSON.parse(JSON.stringify(user));

        //生成token
        let token = await helper.createToken(userDataStr);

        helper.returnBody(true, { access_token: token, userInfo: user }, '登录成功');
    },

    /**
     * 邮箱登录
     * @returns {Promise<void>}
     */
    async loginByEmail() {
        const { ctx, service, helper } = app;
        const { email, code } = ctx.request.body;
        if (!email) {
            helper.returnBody(false, {}, '邮箱不能为空');
            return;
        } else if (!code) {
            helper.returnBody(false, {}, '验证码不能为空');
        }

        let emailUser = await service.user.findUserByEmail(email);
        if (!emailUser.email) {
            helper.returnBody(false, {}, '邮箱未注册');
            return;
        }

        //校验邮箱验证码是否过期
        try {
            const findEmailCode = await service.user.findEmailAndCode(email);
            const isfindEmailCode = helper.isEmpty(findEmailCode);
            if (isfindEmailCode) {
                helper.returnBody(false, {}, '验证码已过期,请重新发送');
                return;
            }

            const startTime = new Date(findEmailCode.expire).getTime();
            const endTime = new Date().getTime();
            const time = endTime - startTime;


            if (findEmailCode.code !== code) {
                helper.returnBody(false, {}, '验证码错误');
                return;
            } else if (time >= 60 * 1000) {
                helper.returnBody(false, {}, '验证码已过期');
                //过期就删除数据库里的验证码集合
                await service.user.deleteEmailAndCode(email);
                return;
            }



            let userDataStr = JSON.parse(JSON.stringify(emailUser));

            //生成token
            let token = await helper.createToken(userDataStr);
            helper.returnBody(true, { access_token: token, userInfo: emailUser }, '登录成功');
            //登录成功删除验证码
            await service.user.deleteEmailAndCode(email);
        } catch (err) {
            helper.returnBody(false, {}, '服务器登录出错');
            return;
        }


    },

    /**
     * 注册
     * @returns {Promise<void>}
     */
    async register() {
        const { ctx, service, helper } = app;
        const { username, password, email } = ctx.request.body;

        //密码长度拦截
        if (!password) {
            helper.returnBody(false, {}, "密码不能为空");
            return;
        } else if (password.length < 6 || password.length > 12) {
            helper.returnBody(false, {}, "密码长度为6-12位");
            return;
        } else if (!email) {
            helper.returnBody(false, {}, "邮箱不能为空");
            return
        }

        //验证是否已注册
        const user = await service.user.getUsersByQuery({
            $or: [
                { username },
                { email },
            ]
        });

        if (user.length > 0) {
            helper.returnBody(false, {}, "用户或邮箱已被注册");
            return;
        }

        let decryptPassword = await helper.decryptData(password);

        let pass = await helper.createPassword(decryptPassword);
        let userData = await service.user.createUser(username, pass, email);
        userData = userData.toObject();
        let userDataStr = JSON.parse(JSON.stringify(userData)); //防止被篡改

        //token
        let token = await helper.createToken(userDataStr);
        helper.returnBody(true, { access_token: token, userInfo: userDataStr }, '注册成功!');
    },

    /**
     * 返回给前端的RSA公钥
     * @return {*} publicKey:公钥;privateKey:私钥
     */
    async getPublicKey() {
        const { helper } = app;
        try {
            const publicKey = await helper.generatePublicKey()
            helper.returnBody(true, { publicKey }, '获取成功!');
        } catch (err) {
            helper.returnBody(false, {}, '获取公钥失败');
        }

    },

    /**
     * 测试RSA解密
     */
    testRSA() {
        const { ctx, helper } = app;
        const { publicKey, data } = ctx.request.body;
    }
})