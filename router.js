module.exports = app => {
    const { router, controller, middleware } = app;
    //登录注册
    router.post('/ruyi/auth/login', controller.auth.login);
    router.post('/ruyi/auth/register', controller.auth.register);

    //用户
    router.get('/ruyi/user/info', middleware.auth, controller.user.getUserinfo);
    router.post('/ruyi/user/updata/name', middleware.auth, controller.user.updataUserName);
    router.post('/ruyi/user/updata/password', middleware.auth, controller.user.updataPassword);
    router.post('/ruyi/user/updata/avater', middleware.auth, controller.user.updataAvatar);
    router.get('/ruyi/user/getUserList', middleware.auth, controller.user.fuzzyQueryUserList);

}