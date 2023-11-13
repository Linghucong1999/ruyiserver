module.exports = app => ({
    /**
     * 登录
     * @returns {Promise<void>}
     */

    async login() {
        const { ctx } = app;
        const { username, password } = ctx.request.body;
    }
})