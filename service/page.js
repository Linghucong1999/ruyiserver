module.exports = app => ({
    /**
     * 获取我的页面列表
     * @returns {Promise<void>}
     */
    async getMyPageList(pageMode, type) {
        const { ctx, model } = app;
        let userData = ctx.userData;
        let query = {
            pageMode,
            isTemplate: { $ne: true }
        }

        if (type === 'my') {
            query.author = userData._id;
        } else if (type === 'cooperation') {
            query.members = { $elemMatch: { $in: userData._id } }
        }

        return await model.page.find(query).select('_id title coverImage isPublish').exec();
    },

    /**
     * 获取‘我的’页面数量
     * @returns {Promise<void>}
     */
    async getMyPagesCount(pageMode) {
        const { ctx, model } = app;
        let userData = ctx.userData;
        let query = {
            author: userData._id,
            pageMode: pageMode,
            is_delete: { $ne: true },
            isTemplate: { $ne: true }
        }
        return await model.page.count(query);
    },

    /**
     * 获取‘我’协作的页面
     * @returns {Promise<void>}
     */
    async getCooperationPages(pageMode) {
        const { ctx, model } = app;
        let userData = ctx.userData;
        let query = {
            members: {
                $elemMatch: { $in: userData._id }
            },
            pageMode: pageMode,
            is_delete: { $ne: true },
            isTemplate: { $ne: true }
        };
        return await model.page.count(query);
    },

    /**
     * 获取我的模板列表
     * @param pageMode
     */
    async getMyTemplates(pageMode) {
        const { ctx, model } = app;
        let userData = ctx.userData;
        let query = {
            author: userData._id,
            isTemplate: true,
        }
        if (pageMode) {
            query.pageMode = pageMode;
        }
        return await model.page.find(query).select('_id title coverImage').exec();
    },

    /**
     * 创建页面
     * @param pageData
     * @returns {Promise<void>}
     */
    async createPage(pageData) {
        const { ctx, model } = app;
        let userData = ctx.userData;
        return await model.page.create({
            ...pageData,
            author: userData._id,
        })
    },
})