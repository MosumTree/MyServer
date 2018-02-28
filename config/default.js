module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    mysql:{
        host:'127.0.0.1',
        user:'root',
        password:'109827cyy',
        database:'test',
        port:3306
    }
}