module.exports = app => ({
    /**
     * 获取列表协作人
     */
    async getCooperationUserListByPageID(ctx) {
        const { service, helper } = app;
        const { pageId } = ctx.request.query;
        const cooperationList = await service.page.getCooperationUserListByPageID(pageId);
        helper.returnBody(ctx, true, cooperationList);
    },

    /**
     * 通过用户列表添加协作人
     */
    async addCooperationUser(ctx) {
        const { service, helper } = app;
        const { pageId, userIds } = ctx.request.body
        const result = await service.page.addCooperationUser(pageId, userIds);
        helper.returnBody(ctx,true, result);
    },

    /**
     * 删除协作人
     */
    async removeCooperationUser(ctx) {
        const { service, helper } = app;
        const { pageId, userId } = ctx.request.body;
        const result = await service.page.removeCooperationUser(pageId, userId);
        helper.returnBody(ctx,true, result);
    }
})