module.exports = app => ({

    /**
     * Postman 数据测试加密
     */
    async encryTestData() {
        const { ctx, helper } = app;
        const { data } = ctx.request.body;
        try {
            const result = await helper.encryptTestData(data);
            helper.returnBody(true, { data: result });
        } catch (err) {
            console.log(err);
        }
    }
})