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
    }
})