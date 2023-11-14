const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');   //用户加密使用他
const crypto = require('crypto');         //其他加密使用他
const jwt = require('jsonwebtoken');

module.exports = app => ({
    /**
     * 返回客户端的内容
     * @param status //接口是否请求成功
     * @param body //返回的数据
     * @param message //返回的信息提示
     * @param code //状态码
     */
    returnBody(status = true, body = {}, message = 'success', code = 200) {
        let { ctx } = app;
        ctx.status = code;
        ctx.body = {
            status,
            body,
            message,
            code
        };
    },

    //生成token
    async createToken(data) {
        let { $config } = app;
        return await jwt.sign(data, $config.jwt.secret, { expiresIn: 30 * 24 * 60 * 60 + 's' });
    },

    //验证token
    async verifyToken(token) {
        let { $config } = app;
        return await jwt.verify(token, $config.jwt.secret);
    },
})