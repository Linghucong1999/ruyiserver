module.exports = app => ({
    /**
     * 登录
     * @returns {Promise<void>}
     */

    async login() {
        const { ctx,$service } = app;
        const { username, password } = ctx.request.body;
        console.log($service)
        //验证数据库是否存在
        let user=await $service.user.getUsersByUsername(username);
        if(!user){

        }
    }
})