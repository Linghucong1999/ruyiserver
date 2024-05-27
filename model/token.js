module.exports = app => {
    const { mongoose } = app;
    const Schema = mongoose.Schema;

    const tokenSchema = new Schema({
        // 用户id
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        // token
        token: {
            type: String,
            required: true
        },
        old_token: {
            type: String,
            required: true
        }
    }, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

    return mongoose.model('token', tokenSchema);
}