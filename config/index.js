module.exports = {
    port: 8018,
    mongodb: {
        url: 'mongodb://localhost:27017/ruyidatabase',
        options: {}
    },
    middleware: ['handlerError'],
    jwt: { secret: 'linghucong1998' },
    crypto: { secret: '#*#*linghucong1998*#*#' },
    bcrypt: { saltRounds: 10 },
    baseUrl: ''
}