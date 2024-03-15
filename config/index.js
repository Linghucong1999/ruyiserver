module.exports = {
    port: 8018,
    mongodb: {
        url: 'mongodb://localhost:27017/ruyidatabase',
        options: {
            maxPoolSize: 10,
            minPoolSize: 2,
        }
    },
    middleware: ['handlerError'],
    jwt: { secret: 'linghucong1998' },
    crypto: { secret: '#*#*linghucong1998*#*#' },
    bcrypt: { saltRounds: 10 },
    baseUrl: ''
}