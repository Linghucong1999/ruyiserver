module.exports = app => {
    const { mongoose } = app;
    const Schema = mongoose.Schema;

    const emailCodeSchema = new Schema({
        email: {
            type: String,
            ref: 'user',
        },
        code: String,
        expire: Date
    })

    return mongoose.model('emailCode', emailCodeSchema);
}