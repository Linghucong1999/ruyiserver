const nodemailer = require('nodemailer');
const path = require('path');

module.exports = app => ({
    /**
     * 获取个人信息
     * @returns {Promise<viod>}
     */
    async getUserinfo() {
        const { ctx, helper, service } = app;
        let user = await service.user.getUserById(ctx.userData._id);
        helper.returnBody(true, user);
    },

    /**
     * 更新个人姓名
     * @returns {Promise<void>}
     */
    async updataUserName() {
        const { ctx, service, helper } = app;
        const { name } = ctx.request.body;
        const user = await service.user.updataUserName(name);
        helper.returnBody(true, user);
    },

    /**
     * 更新密码
     * @returns {Promise<void>}
     */
    async updataPassword() {
        const { ctx, service, helper } = app;
        const userData = ctx.userData;
        const { oldPassword, newPassword, reconPassword } = ctx.request.body;

        if (newPassword !== reconPassword) {
            helper.returnBody(false, '更改输入的两次密码不一致');
            return;
        }

        const userCurrentPassword = await service.user.getUsersPasswordByUsername(userData.username);
        const verifyPassword = await helper.verifyPassword(oldPassword, userCurrentPassword.password);

        if (!verifyPassword) {
            helper.returnBody(false, {}, '原密码错误');
            return;
        }

        const password = await helper.createPassword(newPassword);
        const user = await service.user.updataPassword(password);
        helper.returnBody(true, user);
    },

    /**
     * 更新头像
     * @returns {Promise<void>}
     */
    async updataAvatar() {
        const { ctx, service, helper } = app;
        const userData = ctx.userData;
        let file = ctx.request.files.file;
        try {
            let fileResult = await service.file.uploadFile(file, 'avatar/' + userData.username);
            const user = await service.user.updataAvatar(fileResult.url);
            helper.returnBody(true, user);
        } catch (err) {
            helper.returnBody(false, err);
        }


    },

    /**
     * 模糊查询
     */
    async fuzzyQueryUserList() {
        const { ctx, service, helper } = app;
        const { keywords } = ctx.request.query;
        const users = await service.user.findUserByKeyword(keywords);
        helper.returnBody(true, users);
    },


    /**
     * 发送邮箱验证码
     * @returns {Promise<void>}
     */
    async sendLoginByEmailCode() {
        const { ctx, service, helper } = app;
        const { email } = ctx.request.body;
        const user = await service.user.findUserByEmail(email);
        const isUser = helper.isEmpty(user);
        if (isUser) {
            helper.returnBody(false, {}, '该邮箱未注册');
            return;
        }
        //smtp认证使用的邮箱账号密码
        let username = '2865911620@aliyun.com';
        let password = '2865911620@qq.com';

        //创建邮箱连接池
        let transporter = nodemailer.createTransport({
            host: 'smtp.aliyun.com',
            port: 465,
            secure: true,
            auth: {
                user: username,
                pass: password,
            }
        })

        transporter.verify((err, success) => {
            if (err) {
                console.log('邮箱连接失败，检测一下配置');
                return;
            } else {
                console.log('邮箱连接成功，开始发送邮件');
            }
        })

        //创建一个随机的四位数验证码
        let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        let mailOptions = {
            from: `RuYICode<${username}>`,
            to: email,
            subject: '无代码世界',
            text: '邮箱验证码',
            html:
                '<h1 style="color:#333; font-size:24px; text-align:center;">您好,尊敬的用户</h1>' +
                '<p style="color:#666; font-size:16px; line-height:1.5;">您的验证码为：<h2 style="font-weight: bold;color: #f00 ">' + code + '</h2></p>' +
                '<p style="color:#666; font-size:16px; line-height:1.5;">请尽快完成注册,该验证码1分钟内有效</p> ' +
                '<p style="color:#666; font-size:16px; line-height:1.5;">如非本人操作,请立即对你的邮箱进行验证</p>' +
                '<div><img src="cid:002" style="width:200px;height:auto"/></div>',
            attachment: [
                {
                    filename: 'eamilimg.jpg',
                    path: '../public/image/eamilimg.jpg',
                    cid: '001',
                }, {
                    filename: 'pikaqiu.gif',
                    path: '../public/image/pikaqiu.gif',
                    cid: '002'
                }
            ]
        }

        let sendEamilMessage = await transporter.sendMail(mailOptions)
        if (!helper.isEmpty(sendEamilMessage.messageId)) {
            //将验证码存储数据库中
            let saveCode = await service.user.saveEmailAndCode(email, code);

            if (saveCode) {
                helper.returnBody(true, {}, '验证码发送成功');
                console.log('验证码发送成功');
            } else {
                helper.returnBody(false, {}, '验证码存储失败');
            }
        }

    },

    /**
     * 通过邮箱重置密码第一步，验证邮箱以及验证验证码是否过期
     */
    async resetPasswordFirstStep() {
        const { ctx, service, helper } = app;
        const { email, code } = ctx.request.body;
        const findEmailAndCode = await service.user.findEmailAndCode(email);
        const isFindEmailCode = helper.isEmpty(findEmailAndCode);
        if (isFindEmailCode) {
            helper.returnBody(false, {}, '验证码已过期,请重新发送');
            return;
        }

        const startTime = new Date(findEmailAndCode.expire).getTime();
        const endTime = new Date().getTime();
        const time = endTime - startTime;


        if (findEmailAndCode.code !== code) {
            helper.returnBody(false, {}, '验证码错误');
            return;
        } else if (time >= 60 * 1000) {
            helper.returnBody(false, {}, '验证码已过期');
            //过期就删除数据库里的验证码集合
            await service.user.deleteEmailAndCode(email);
            return;
        }

        try {
            let emailUser = await service.user.findUserByEmail(email);
            let userDataStr = JSON.parse(JSON.stringify(emailUser));

            //生成token
            let token = await helper.createToken(userDataStr);
            helper.returnBody(true, { access_token: token });

            //删除验证码
            await service.user.deleteEmailAndCode(email);
        } catch (err) {
            helper.returnBody(false, {}, '服务器出错');
            return;
        }
    },

    /**
     * 通过邮箱和验证码验证后,用户进行重置密码
     */
    async userResetPassword() {
        const { ctx, service, helper } = app;

        const { newPassword, reconPassword } = ctx.request.body;
        if (newPassword !== reconPassword) {
            helper.returnBody(false, '更改输入的两次密码不一致');
            return;
        }

        const password = await helper.createPassword(newPassword);
        const user = await service.user.updataPassword(password);
        helper.returnBody(true, '密码重置成功', '密码重置成功');
    }
})