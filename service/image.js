module.exports = app => ({
    async getMyImages() {
        const { ctx, model } = app;
        const userData = ctx.userData;
        const query = { author: userData._id };
        return await model.image.find(query).select('_id url').exec();
    },

    /**
     * 添加图片
     * @param {*} url 
     * @returns 
     */
    async addImage(url) {
        const { ctx, model } = app;
        const userData = ctx.userData;
        return await model.image.create({
            author: userData._id,
            url,
        })
    }
})