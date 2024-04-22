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
        let newPageData = ctx.request.body;
        const page = await service.page.createPage(newPageData);
        helper.returnBody(true, page);
    },

    /**
     * 我的模板列表
     * 
     */
    async getMyTemplateList() {
        const { ctx, service, helper } = app;
        let { pageMode } = ctx.request.query;
        const myTemplateList = await service.page.getMyTemplates(pageMode);
        helper.returnBody(true, { page: myTemplateList });
    },

    /**
     * 获取页面详情
     */
    async getPageDetail() {
        const { ctx, service, helper } = app;
        const { pageId } = ctx.request.query;
        const pageDetail = await service.page.getPageDetail(pageId);
        helper.returnBody(true, pageDetail);
    },

    /**
     * 更新页面
     */
    async updatedPage() {
        const { ctx, service, helper } = app;
        const { pageData } = ctx.request.body;
        try {
            await service.page.updated(pageData);
            helper.returnBody(true, {}, '更新成功');
        } catch (err) {
            console.log('更新页面数据失败...', err);
        }
    },
    /**
     * 渲染页面
     */
    async view() {
        const { ctx, service } = app;
        const pageID = ctx.params._id;
        const pageData = await service.page.getPageDetail(pageID);
        const pageMode = {
            'H5': 'ruyi-swiper',
            'longPage': 'ruyi-long',
            'relativePage': 'ruyi-relative',
            'pc': 'pc'
        };
        ctx.status = 200;
        await ctx.render(pageMode[pageData.pageMode], { pageData: pageData });
    },

})