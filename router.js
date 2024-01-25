module.exports = app => {
    const { router, controller, middleware } = app;

    //发送公钥
    router.get('/ruyi/auth/public/login', controller.auth.getPublicKey);

    //登录注册
    router.post('/ruyi/auth/login', controller.auth.login);
    router.post('/ruyi/auth/login/email', controller.auth.loginByEmail)
    router.post('/ruyi/auth/send/email/code', controller.user.sendLoginByEmailCode)
    router.post('/ruyi/auth/register', controller.auth.register);

    //用户
    router.get('/ruyi/user/info', middleware.auth, controller.user.getUserinfo);
    router.post('/ruyi/user/updata/name', middleware.auth, controller.user.updataUserName);
    router.post('/ruyi/user/updata/password', middleware.auth, controller.user.updataPassword);
    router.post('/ruyi/user/updata/avater', middleware.auth, controller.user.updataAvatar);
    router.get('/ruyi/user/getUserList', middleware.auth, controller.user.fuzzyQueryUserList);

    //用户未登录前的重置密码步骤
    router.post('/ruyi/email/password/reset/first', controller.user.resetPasswordFirstStep);

    //通过邮箱后重置密码
    router.post('/ruyi/email/password/reset/second', middleware.auth, controller.user.userResetPassword);

    //页面
    router.get('/ruyi/page/getMyPages', middleware.auth, controller.page.myPageList);
    router.post('/ruyi/page/create', middleware.auth, controller.page.createPage);


    //我的模板
    router.get('/ruyi/template/getMyTemplates', middleware.auth, controller.page.getMyTemplateList);


}