module.exports = app => {
    return async function (ctx, next) {
        try {
            await next();
        } catch (err) {
            const status = err.status || 500;

            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 ? 'Internal Server Error' : err.message;
            ctx.body = {
                message: error,
                status: false,
                body: {},
                code: status
            }
        }
    }
}