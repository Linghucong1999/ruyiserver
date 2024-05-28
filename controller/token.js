module.exports = app => ({
    // 用户进行在其他地方重新登录，会强制询问用户是否进行登录，还是回到原来的地方
    async checkLogin(ctx) {
        const { service, helper } = app;
        const { username } = ctx.request.body;
        const user = await service.token.checkLogin(username);
        try {
            if (!user) {
                helper.returnBody(ctx, true, {});
            } else {
                helper.returnBody(ctx, true, user);
            }
        } catch (err) {
            helper.returnBody(ctx, true, {});
            console.log("获取用户状态失败" + err);
        }
    },

    // 用户退出的时候，清空该用户在token集合的信息
    async logoutClearToken(ctx) {
        const { service, helper } = app;
        const userData = ctx.userData;
        const delete_token = await service.token.logoutClearToken(userData._id);
        if (delete_token.acknowledged) {
            helper.returnBody(ctx, true, {}, '退出成功');
        } else {
            helper.returnBody(ctx, true, {});
        }
    }

})