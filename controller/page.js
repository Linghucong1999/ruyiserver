module.exports = app => ({
    /**
     * 我的页面列表
     * @returns {Promise<void>}
     */
    async myPageList() {
        const { ctx, service, helper } = app;
        let { pageMode, type } = ctx.request.query;     //pageMode是渲染模式
        const pages = await service.page.getMyPageList(pageMode, type);
        const myPageCount = await service.page.getMyPagesCount(pageMode);
        const myCooperationPageCount = await service.page.getCooperationPages(pageMode);
        helper.returnBody(true, { pages, myPageCount, myCooperationPageCount });
    },
    /**
     * 创建页面
     * @returns {Promise<void>}
     */
    async createPage() {
        const { ctx, service, helper } = app;
        let newPageData=ctx.request.body;
        const page=await service.page.createPage(newPageData);
        helper.returnBody(true,page);
    },

    /**
     * 我的模板列表
     * @returns {Promise<void>}
     */
    async getMyTemplateList() {
        const { ctx, service, helper } = app;
        let { pageMode } = ctx.request.query;
        const myTemplateList = await service.page.getMyTemplates(pageMode);
        helper.returnBody(true, { page: myTemplateList });
    }
})