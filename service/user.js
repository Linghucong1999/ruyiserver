let selectUserKey = { _id: 0, password: 0 };
module.exports = app => ({
    /**
     * 新增用户
     * @param options
     * @returns {Promise<void>}
     */

    async createUser(username, password, email, name) {
        const { $model } = app;
        await $model.user.create({
            username: username,
            password: password,
            email: email,
            name: name || username
        })
        const query = { username: { $in: username } };
        return $model.user.findOne(query, selectUserKey).exec();

    },

    /**
     * 根据用户名查找用户
     * @param username
     * @returns {Promise<void>}
     */

    async getUsersByUsername(username) {
        const { $model } = app;
        if (username.length === 0) {
            return null;
        }

        const query = { username: { $in: username } };

        return $model.user.findOne(query, selectUserKey).exec();
    },

    /**
     * 根据用户名查找用户对比
     * @param username
     * @returns {Promise<void>}
     */
    async getUsersByUsernameCompare(username) {
        const { $model } = app;
        if (username.length === 0) {
            return null;
        }
        const query = { username: { $in: username } };
        return $model.user.findOne(query).select('password').exec();
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
        const { $model } = app;
        return $model.user.find(query, '', selectUserKey).exec();
    }
})