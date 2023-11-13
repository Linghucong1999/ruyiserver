module.exports = app => {
    const { router, $controller } = app;
    //登录注册认证
    router.post('/ruyi/auth/login',$controller.auth.login);
}