/**
 * 登录验证
 * @return {null} null
 */
module.exports = app => {
    return async function (ctx, next) {
        let { $helper } = app;
        let token = "";

        if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
            
        }
    }
}