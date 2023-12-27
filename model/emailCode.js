module.exports = app => {
    const { mongoose } = app;
    const Schema = mongoose.Schema;

    const emailCodeSchema = new Schema({
        email: String,
        code: String,
        expire: Date
    })

    return mongoose.model('emailCode', emailCodeSchema);
}