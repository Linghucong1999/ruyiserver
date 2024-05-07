/**
 * 登录验证
 * @return {null} null
 */
module.exports = app => {
    return async function (ctx, next) {
        let { helper } = app;
        let token = "";

        if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
            token = ctx.headers.authorization.split(' ')[1];
        } else if (ctx.query.accesstoken) {
            token = ctx.query.accesstoken;
        } else if (ctx.request.body.accesstoken) {
            token = ctx.request.body.accesstoken;
        }

        let user;
        try {
            user = await helper.verifyToken(token);
        } catch (err) {
            helper.returnBody(ctx, false, {}, 'Token 无效,请重新登录', 401);
        }

        if (!user) {
            helper.returnBody(ctx, false, {}, '身份过期,请重新登录', 401);
            return;
        }

        ctx.userData = user;
        app.userData = user;
        await next();
    }
}