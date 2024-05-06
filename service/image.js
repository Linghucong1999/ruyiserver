module.exports = app => ({
    async getMyImages(ctx) {
        const { model } = app;
        const userData = ctx.userData;
        const query = { author: userData._id };
        return await model.image.find(query).select('_id url').exec();
    },

    /**
     * 添加图片
     * @param {*} url 
     * @returns 
     */
    async addImage(url,ctx) {
        const { model } = app;
        const userData = ctx.userData;
        return await model.image.create({
            author: userData._id,
            url,
        })
    },

    /**
     * 添加项目封面图片
     */
    async addCoverImage(url, id) {
        const { model } = app;
        return await model.page.findOneAndUpdate({ _id: id }, { $set: { coverImage: url } }, { runValidators: true });
    }
})