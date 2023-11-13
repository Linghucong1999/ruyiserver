let selectUserKey = { _id: 0, password: 0 };
module.exports = app => ({
    /**
     * 新增用户
     * @param options
     * @returns {Promise<void>}
     */

    async createUser(username, password, email, name) {
        const { $model } = app;

        try {
            await $model.user.create({
                username: username,
                password: password,
                email: email,
                name: name || username
            })
            const query = { username: { $in: username } };
        } catch (err) {

        }
    }
})