module.exports = app => ({

    /**
     * 登录
     * @returns {Promise<void>}
     */

    async login(ctx) {
        const { service, helper } = app;
        const { username, password } = ctx.request.body;

        if (!username || !password) {
            helper.returnBody(ctx, true, {}, '请核对表单');
            return;
        }

        //验证数据库是否存在
        let user = await service.user.getUsersByUsername(username);
        if (!user) {
            helper.returnBody(ctx, true, {}, '用户不存在');
            return;
        }

        //校验密码
        try {
            // 数据解密
            const decryptPassword = await helper.decryptData(password);

            const userCurrentPassword = await service.user.getUsersPasswordByUsername(username);
            // const userCurrentPassword = await model.user.findOne(query).select('password').exec();
            const verifyPass = await helper.verifyPassword(decryptPassword, userCurrentPassword.password);
            if (!verifyPass) {
                helper.returnBody(ctx, true, {}, "密码错误，请重试!");
                return;
            }
        } catch (err) {
            helper.returnBody(ctx, true, {}, '解密出错');
            return;
        }


        user = user.toObject();
        let userDataStr = JSON.parse(JSON.stringify(user));

        //生成token
        let token = await helper.createToken(userDataStr);
        await helper.saveToken(user._id, token);

        helper.returnBody(ctx, true, { access_token: token, userInfo: user }, '登录成功');

    },

    /**
     * 邮箱登录
     * @returns {Promise<void>}
     */
    async loginByEmail(ctx) {
        const { service, helper } = app;
        const { email, code } = ctx.request.body;
        if (!email) {
            helper.returnBody(ctx, true, {}, '邮箱不能为空');
            return;
        } else if (!code) {
            helper.returnBody(ctx, true, {}, '验证码不能为空');
        }

        let emailUser = await service.user.findUserByEmail(email);
        if (!emailUser.email) {
            helper.returnBody(ctx, true, {}, '邮箱未注册');
            return;
        }

        //校验邮箱验证码是否过期
        try {
            const findEmailCode = await service.user.findEmailAndCode(email);
            const isfindEmailCode = helper.isEmpty(findEmailCode);
            if (isfindEmailCode) {
                helper.returnBody(ctx, true, {}, '验证码已过期,请重新发送');
                return;
            }

            const startTime = new Date(findEmailCode.expire).getTime();
            const endTime = new Date().getTime();
            const time = endTime - startTime;


            if (findEmailCode.code !== code) {
                helper.returnBody(ctx, true, {}, '验证码错误');
                return;
            } else if (time >= 60 * 1000) {
                helper.returnBody(ctx, true, {}, '验证码已过期');
                //过期就删除数据库里的验证码集合
                await service.user.deleteEmailAndCode(email);
                return;
            }



            let userDataStr = JSON.parse(JSON.stringify(emailUser));

            //生成token
            const token = await helper.createToken(userDataStr);
            await helper.saveToken(emailUser._id, token);
            helper.returnBody(ctx, true, { access_token: token, userInfo: emailUser }, '登录成功');
            //登录成功删除验证码
            await service.user.deleteEmailAndCode(email);
        } catch (err) {
            console.log(err + "邮箱登录错误");
            helper.returnBody(ctx, false, {}, '服务器登录出错', 500);
            return;
        }


    },

    /**
     * 注册
     * @returns {Promise<void>}
     */
    async register(ctx) {
        const { service, helper } = app;
        const { username, password, email } = ctx.request.body;

        //密码长度拦截
        if (!password) {
            helper.returnBody(ctx, true, {}, "密码不能为空");
            return;
        } else if (!email) {
            helper.returnBody(ctx, true, {}, "邮箱不能为空");
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
            helper.returnBody(ctx, true, {}, "用户或邮箱已被注册");
            return;
        }

        let decryptPassword = await helper.decryptData(password);

        let pass = await helper.createPassword(decryptPassword);
        let userData = await service.user.createUser(username, pass, email);
        userData = userData.toObject();
        let userDataStr = JSON.parse(JSON.stringify(userData)); //防止被篡改

        //token
        const token = await helper.createToken(userDataStr);
        await helper.saveToken(userData._id, token);
        helper.returnBody(ctx, true, { access_token: token, userInfo: userDataStr }, '注册成功!');
    },

    /**
     * 返回给前端的RSA公钥
     * @return {*} publicKey:公钥;privateKey:私钥
     */
    async getPublicKey(ctx) {
        const { helper } = app;
        try {
            const publicKey = await helper.generatePublicKey()
            helper.returnBody(ctx, true, { publicKey }, '获取成功!');
        } catch (err) {
            helper.returnBody(ctx, false, {}, '获取公钥失败');
        }

    },
})