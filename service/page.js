module.exports = app => ({
    /**
     * 获取我的页面列表
     * @returns {Promise<void>}
     */
    async getMyPageList(pageMode, type, ctx) {
        const { model } = app;
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
    async getMyPagesCount(pageMode, ctx) {
        const { model } = app;
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
    async getCooperationPages(pageMode, ctx) {
        const { model } = app;
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
    async getMyTemplates(pageMode, ctx) {
        const { model } = app;
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
    async createPage(pageData, ctx) {
        const { model } = app;
        let userData = ctx.userData;
        return await model.page.create({
            ...pageData,
            author: userData._id,
        })
    },

    /**
     * 获取页面详情
     * 如果表复杂，那么记得可以使用populate可以进行连表查，但是使用到mongodb了，就希望不使用到这一步骤
     */
    getPageDetail(pageId) {
        const { model } = app;
        return model.page.findById(pageId);
    },

    /**
     * 更新页面
     * @param {*} pageData 
     * @returns 
     */
    async updated(pageData) {
        const { model } = app;
        return await model.page.findOneAndUpdate({ _id: pageData._id }, { $set: pageData }, { runValidators: true });
    },

    /**
     * 发布页面
     */
    async setPublish(id) {
        const { model } = app;
        return await model.page.findByIdAndUpdate(id, { $set: { isPublish: true } });
    },

    /**
     * 获取协作人列表
     */
    async getCooperationUserListByPageId(id) {
        const { model } = app;
        const doc = await model.page.findOne({ _id: id }).populate({
            path: 'members',
            model: model.user,
            select: 'name username _id email avatar',
        }).exec();
        return doc.members;
    },

    /**
     * 通过用户集合添加协作者
     */
    async addCooperationUser(pageId, userIds) {
        const { model } = app;
        await model.page.findByIdAndUpdate({ _id: pageId }, {
            $addToSet: {
                members: { $each: userIds }
            }
        })
        const pageData = await model.page.findOne({ _id: pageId }).populate({
            path: 'members',
            model: model.user,
            select: 'name username _id email avatar',
        }).exec();
        return pageData.members;
    },

    /**
     * 删除协作人
     */
    async removeCooperationUser(pageId, userId) {
        const { model } = app;
        return await model.page.updateOne({ _id: pageId }, { $pull: { members: userId } }, { runValidators: true });
    },

    /**
     * 删除页面
     */
    async deletePage(id) {
        const { model } = app;
        return await model.page.findOneAndDelete({ _id: id });
    },

    /**
     * 获取模板市场里的模板
     */
    async getPublishTemplates(pageMode) {
        const { model } = app;
        const query = { isPublish: true, isTemplate: true };
        if (pageMode) query.pageMode = pageMode;
        return await model.page.find(query).select('_id title coverImage').exec();
    }
})