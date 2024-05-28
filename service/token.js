module.exports = app => ({
    async checkLogin(username) {
        const { model } = app;

        // 查询用户是否存在
        const user = await model.user.findOne({ username: { $in: username } }).exec();
        if (!user) {
            return '';
        } else {
            return await model.token.findOne({ user_id: user._id }).exec();
        }
    },

    async logoutClearToken(id) {
        const { model } = app;
        try {
            const delete_token = await model.token.deleteOne({ user_id: id }).exec();
            return delete_token;
        } catch (err) {
            console.log(err + "退出登录删除用户Token失败");
            return { acknowledged: false, deletedCount: 0 };
        }

    },
})