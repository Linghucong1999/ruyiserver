module.exports = app => ({
    /**
     * 我的页面列表
     * @returns {Promise<void>}
     */
    async myPageList(ctx) {
        const { service, helper } = app;
        let { pageMode, type } = ctx.request.query;     //pageMode是渲染模式
        const pages = await service.page.getMyPageList(pageMode, type, ctx);
        const myPageCount = await service.page.getMyPagesCount(pageMode, ctx);
        const myCooperationPageCount = await service.page.getCooperationPages(pageMode, ctx);
        helper.returnBody(ctx, true, { pages, myPageCount, myCooperationPageCount });
    },
    /**
     * 创建页面
     * @returns {Promise<void>}
     */
    async createPage(ctx) {
        const { service, helper } = app;
        let newPageData = ctx.request.body;
        const page = await service.page.createPage(newPageData, ctx);
        helper.returnBody(ctx, true, page);
    },

    /**
     * 我的模板列表
     * 
     */
    async getMyTemplateList(ctx) {
        const { service, helper } = app;
        let { pageMode } = ctx.request.query;
        const myTemplateList = await service.page.getMyTemplates(pageMode, ctx);
        helper.returnBody(ctx, true, { page: myTemplateList });
    },

    /**
     * 获取页面详情
     */
    async getPageDetail(ctx) {
        const { service, helper } = app;
        const { pageId } = ctx.request.query;
        const pageDetail = await service.page.getPageDetail(pageId);
        helper.returnBody(ctx, true, pageDetail);
    },

    /**
     * 更新页面
     */
    async updatedPage(ctx) {
        const { service, helper } = app;
        const { pageData } = ctx.request.body;
        try {
            await service.page.updated(pageData);
            helper.returnBody(ctx, true, {}, '更新成功');
        } catch (err) {
            console.log('更新页面数据失败...', err);
        }
    },
    /**
     * 渲染页面
     */
    async view(ctx) {
        const { service } = app;
        try {
            const pageID = ctx.params._id;
            const pageData = await service.page.getPageDetail(pageID);
            const pageMode = {
                'H5': 'ruyi-swiper',
                'longPage': 'ruyi-swiper',
                'relativePage': 'ruyi-relative',
                'pc': 'pc'
            };
            ctx.status = 200;
            await ctx.render(pageMode[pageData.pageMode], { pageData: pageData });
        } catch (err) {
            console.log('渲染页面失败...', err);
            ctx.status = 500;
        }
    },

    /**
     * 复制页面
     */
    async copyPage(ctx) {
        const { service, helper } = app;
        const { id } = ctx.request.body;
        try {
            let page = await service.page.getPageDetail(id);
            page = page.toObject();
            page._id = undefined;
            page.isPublish = false;
            page.isTemplate = false;
            page.members = [];
            const newPage = await service.page.createPage(page, ctx);
            helper.returnBody(ctx, true, { _id: newPage._id });
        } catch (err) {
            console.log('复制页面失败...', err);
        }
    },

    /**
     * 发布页面
     */
    async publish(ctx) {
        const { service, helper } = app;
        const { id } = ctx.request.body;
        await service.page.setPublish(id);
        helper.returnBody(ctx, true);
    },

    /**
     * 设置为模板
     */
    async setTemplate(ctx) {
        const { service, helper } = app;
        try {
            const userData = ctx.userData;
            const { id } = ctx.request.body;
            let page = await service.page.getPageDetail(id);
            page = page.toObject();
            page._id = undefined;
            page.isTemplate = true;
            page.isPublish = true;
            page.members = [];
            page.author = userData._id;
            const newPage = await service.page.createPage({ ...page }, ctx);
            helper.returnBody(ctx, true, { _id: newPage._id });
        } catch (err) {
            console.log('设置为模板失败...', err);
        }
    },

    /**
     * 删除页面
     */
    async deletePage(ctx) {
        const { service, helper } = app;
        const { id } = ctx.request.body;
        try {
            await service.page.deletePage(id);
            helper.returnBody(ctx, true);
        } catch (err) {
            console.log('删除页面失败...', err);
        }
    },

    /**
     * 获取模板市场的所有模板
     */
    async getPublishTemplates(ctx) {
        const { service, helper } = app;
        const { pageMode } = ctx.request.query;
        try {
            const pages = await service.page.getPublishTemplates(pageMode);
            helper.returnBody(ctx, true, pages);
        } catch (err) {
            console.log('获取模板市场失败...', err);
        }
    }

})