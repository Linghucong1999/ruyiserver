module.exports = app => ({

    /**
     * Postman 数据测试加密
     */
    async encryTestData(ctx) {
        const { helper } = app;
        const { data } = ctx.request.body;
        try {
            const result = await helper.encryptTestData(data);
            helper.returnBody(ctx, true, { data: result });
        } catch (err) {
            console.log(err);
        }
    }
})