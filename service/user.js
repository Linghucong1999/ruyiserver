const { mode } = require("crypto-js");

let selectUserKey = { password: 0 };
module.exports = app => ({
    /**
     * 新增用户
     * @param options
     * @returns {Promise<void>}
     */

    async createUser(username, password, email, name) {
        const { model } = app;
        await model.user.create({
            username: username,
            password: password,
            email: email,
            name: name || username
        })
        const query = { username: { $in: username } };
        return model.user.findOne(query, selectUserKey).exec();

    },

    /**
     * 通过_id获取用户信息
     * @param id
     */
    async getUserById(id) {
        const { model } = app;
        const query = { _id: id };
        return model.user.findOne(query, selectUserKey).exec();
    },


    /**
     * 根据用户名查找用户
     * @param username
     * @returns {Promise<void>}
     */

    async getUsersByUsername(username) {
        const { model } = app;
        if (username.length === 0) {
            return null;
        }

        const query = { username: { $in: username } };

        return model.user.findOne(query, selectUserKey).exec();
    },

    /**
     * 根据用户名查找密码
     * @param username
     * @returns {Promise<void>}
     */
    async getUsersPasswordByUsername(username) {
        const { model } = app;
        if (username.length === 0) {
            return null;
        }
        const query = { username: { $in: username } };
        return model.user.findOne(query).select('password').exec();
    },


    /**
     * 根据关键字，获取一组用户
     * Callback:
     * - err,数据库异常
     * - users, 用户列表
     * @param {Object} query 关键字
     * @param {Object} opt 选项
     * @return {Promise[users]} 承载用户列表的Promise对象
     */
    async getUsersByQuery(query) {
        const { model } = app;
        return model.user.find(query, '', selectUserKey).exec();
    },

    /**
     * 更新用户昵称
     * @param {*} name
     */
    async updataUserName(name,ctx) {
        const { model } = app;
        const userData = await ctx.userData;
        await model.user.findByIdAndUpdate(userData._id, { $set: { name: name } });
        return model.user.findOne({ _id: userData._id }, selectUserKey)
    },

    /**
     * 更新密码
     * @param {*} newPassword
     */
    async updataPassword(newPassword) {
        const { ctx, model } = app;
        const userData = await ctx.userData;
        await model.user.findByIdAndUpdate(userData._id, { $set: { password: newPassword } });
        return model.user.findOne({ _id: userData._id }, selectUserKey).exec();
    },

    /**
     * 更新个人头像
     * @param {*} url
     */
    async updataAvatar(url) {
        const { ctx, model } = app;
        const userData = await ctx.userData;
        await model.user.findByIdAndUpdate(userData._id, { $set: { avatar: url } });
        return model.user.findOne({ _id: userData._id }, selectUserKey).exec();
    },

    /**
     * 关键字模糊查询
     * 
     */
    async findUserByKeyword(keyword) {
        const { model } = app;
        return await model.user.find({
            $or: [
                { name: { $regex: keyword } },
                { username: { $regex: keyword } },
                { email: { $regex: keyword } }
            ],
        }, {
            password: 0
        }, {
            sort: { _id: -1 },
            limit: 20
        })
    },

    /**
     * 通过查找邮箱是否存在
     */
    async findUserByEmail(email) {
        const { model } = app;
        return await model.user.findOne({ email }, selectUserKey).exec();
    },

    /**
     * 查找邮箱以及验证码,过期时间
     */

    async findEmailAndCode(email) {
        const { model } = app;
        return await model.emailCode.findOne({ email }).sort({ expire: -1 }).limit(1);
    },

    /**
     * 用户验证码过期进行验证码的删除/重复邮箱的验证码删除
     */
    async deleteEmailAndCode(email) {
        const { model } = app;
        return await model.emailCode.deleteOne({ email });
    },

    /**
     * 邮箱验证码的存储
     */
    async saveEmailAndCode(email, code) {
        const { model, helper } = app;

        try {
            let emailCode = await model.emailCode.findOne({ email }).exec();
            let isEmailCode = helper.isEmpty(emailCode);
            if (!isEmailCode) {
                await model.emailCode.deleteOne({ email });
            }
            let expire = new Date().getTime();

            await model.emailCode.create({ email, code, expire });
            return true;
        } catch (err) {
            return false;
        }
    }


})