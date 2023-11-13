module.exports = app => {
    const { mongoose } = app;
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        username: { type: String, required: [true, '用户名不能为空'] },
        password: { type: String, required: [true, '密码不能为空'] },
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        avatar: { type: String, default: '' },

    }, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

    return mongoose.model('user', userSchema);
}