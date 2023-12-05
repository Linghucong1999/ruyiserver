module.exports = app => ({
    /**
     * 获取个人信息
     * @returns {Promise<viod>}
     */
    async getUserinfo() {
        const { ctx, helper } = app;
        helper.returnBody(true, ctx.userData);
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
            helper.returnBody(false, '原密码错误');
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
    }
})