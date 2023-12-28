module.exports = app => {
    const { router, controller, middleware } = app;
    //登录注册
    router.post('/ruyi/auth/login', controller.auth.login);
    router.post('/ruyi/auth/login/email', controller.auth.loginByEmail)
    router.post('/ruyi/auth/sendeamil/code', controller.user.sendLoginByEmailCode)
    router.post('/ruyi/auth/register', controller.auth.register);

    //用户
    router.get('/ruyi/user/info', middleware.auth, controller.user.getUserinfo);
    router.post('/ruyi/user/updata/name', middleware.auth, controller.user.updataUserName);
    router.post('/ruyi/user/updata/password', middleware.auth, controller.user.updataPassword);
    router.post('/ruyi/user/updata/avater', middleware.auth, controller.user.updataAvatar);
    router.get('/ruyi/user/getUserList', middleware.auth, controller.user.fuzzyQueryUserList);

    //页面
    router.get('/ruyi/page/getMyPages', middleware.auth, controller.page.myPageList);


    //我的模板
    router.get('/ruyi/template/getMyTemplates', middleware.auth, controller.page.getMyTemplateList);


}