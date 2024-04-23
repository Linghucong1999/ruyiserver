module.exports = app => ({
    /**
     * 获取列表协作人
     */
    async getCooperationUserListByPageID() {
        const { ctx, service, helper } = app;
        const { pageId } = ctx.request.query;
        const cooperationList = await service.page.getCooperationUserListByPageID(pageId);
        helper.returnBody(true, cooperationList);
    },

    /**
     * 通过用户列表添加协作人
     */
    async addCooperationUser() {
        const { ctx, service, helper } = app;
        const { pageId, userIds } = ctx.request.body
        const result = await service.page.addCooperationUser(pageId, userIds);
        helper.returnBody(true, result);
    },

    /**
     * 删除协作人
     */
    async removeCooperationUser() {
        const { ctx, service, helper } = app;
        const { pageId, userId } = ctx.request.body;
        const result = await service.page.removeCooperationUser(pageId, userId);
        helper.returnBody(true, result);
    }
})