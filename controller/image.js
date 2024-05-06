/**
 * image
 */

module.exports = app => ({
    /**
     * 获取我的图片列表
     */
    async getMyImages(ctx) {
        const { service, helper } = app;
        const imageList = await service.image.getMyImages(ctx);
        helper.returnBody(ctx, true, imageList);
    },

    /**
     * 上传我的图片
     */
    async uploadImage(ctx) {
        const { service, helper } = app;
        const userData = ctx.userData;
        const timestamps = (new Date().getTime()).toString();
        const file = ctx.request.files.file;
        try {
            const fileResult = await service.file.uploadFile(file, 'image_lib/' + userData.username + '/' + timestamps);
            const imageData = await service.image.addImage(fileResult.url, ctx);
            helper.returnBody(ctx, true, imageData);
        } catch (err) {
            console.log('图片上传问题', err);
            helper.returnBody(ctx, true, {}, '图片上传出错');
        }
    },

    /**
     * 上传封面图片
     */
    async uploadCoverImage(ctx) {
        const { service, helper } = app;
        const _id = ctx.params._id;
        const userData = ctx.userData;
        const timestamps = (new Date().getTime()).toString();
        const file = ctx.request.files.file;
        try {
            const fileResult = await service.file.uploadFile(file, 'cover_image/' + userData.username + '/' + timestamps);
            const project = await service.image.addCoverImage(fileResult.url, _id);
            helper.returnBody(ctx, true, project);
        } catch (err) {
            console.log('封面图片上传问题', err);
            helper.returnBody(ctx, true, {}, '图片上传出错');
        }
    }
})