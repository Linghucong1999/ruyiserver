const Queue = require('promise-queue');
const queue = new Queue(5, 10);

module.exports = app => {
    const { router, controller, middleware } = app;

    // 限制请求API次数
    const handleRequest = async (ctx, next) => {
        await queue.add(async () => {
            await next();
        })
    }

    //测试数据加密
    router.post('/ruyi/test/encrypt/data', controller.test.encryTestData);

    //发送公钥
    router.get('/ruyi/auth/rsa/login/key', controller.auth.getPublicKey);

    //登录注册
    router.post('/ruyi/auth/login', handleRequest, controller.auth.login);
    router.post('/ruyi/auth/login/email', handleRequest, controller.auth.loginByEmail);
    router.post('/ruyi/auth/send/email/code', handleRequest, controller.user.sendLoginByEmailCode);
    router.post('/ruyi/auth/register', handleRequest, controller.auth.register);

    //用户
    router.get('/ruyi/user/info', handleRequest, middleware.auth, controller.user.getUserinfo);
    router.post('/ruyi/user/updata/name', handleRequest, middleware.auth, controller.user.updataUserName);
    router.post('/ruyi/user/updata/password', handleRequest, middleware.auth, controller.user.updataPassword);
    router.post('/ruyi/user/updata/avater', handleRequest, middleware.auth, controller.user.updataAvatar);
    router.get('/ruyi/user/getUserList', handleRequest, middleware.auth, controller.user.fuzzyQueryUserList);

    //用户未登录前的重置密码步骤
    router.post('/ruyi/email/password/reset/first', handleRequest, controller.user.resetPasswordFirstStep);

    //通过邮箱后重置密码
    router.post('/ruyi/email/password/reset/second', handleRequest, middleware.auth, controller.user.userResetPassword);

    //页面
    router.get('/ruyi/page/getMyPages', handleRequest, middleware.auth, controller.page.myPageList);
    router.post('/ruyi/page/create', handleRequest, middleware.auth, controller.page.createPage);
    router.get('/ruyi/page/getPageDetail', handleRequest, middleware.auth, controller.page.getPageDetail);
    router.post('/ruyi/page/update', handleRequest, middleware.auth, controller.page.updatedPage);
    router.post('/ruyi/page/copy', handleRequest, middleware.auth, controller.page.copyPage);
    router.post('/ruyi/page/setPublish', handleRequest, middleware.auth, controller.page.publish);
    router.post('/ruyi/page/setTemplate', handleRequest, middleware.auth, controller.page.setTemplate);

    // 页面协作
    router.get('/ruyi/page/getCooperationList', handleRequest, middleware.auth, controller.cooperation.getCooperationUserListByPageID);
    router.post('/ruyi/page/addCooperation', handleRequest, middleware.auth, controller.cooperation.addCooperationUser);
    router.post('/ruyi/page/deleteCooperation', handleRequest, middleware.auth, controller.cooperation.removeCooperationUser);

    // 页面渲染
    router.get('/ruyi/view/:_id', controller.page.view);


    //我的模板
    router.get('/ruyi/template/getMyTemplates', handleRequest, middleware.auth, controller.page.getMyTemplateList);

    // 上传psd文件
    router.post('/ruyi/psd/upload', handleRequest, middleware.auth, controller.psd.psdUpload);

    // 用户上传的图片库
    router.get('/ruyi/imageLib/myImages', middleware.auth, controller.image.getMyImages);
    router.post('/ruyi/imageLib/upload', middleware.auth, controller.image.uploadImage);

    // 项目封面图片
    router.post('/ruyi/imageCommon/upload/:_id', middleware.auth, controller.image.uploadCoverImage);


}