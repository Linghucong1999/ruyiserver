const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');   //用户加密使用他
const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');

module.exports = app => ({
    /**
     * 返回客户端的内容
     * @param status //接口是否请求成功
     * @param body //返回的数据
     * @param message //返回的信息提示
     * @param code //状态码
     */
    returnBody(status = true, body = {}, message = 'success', code = 200) {
        let { ctx } = app;
        ctx.status = code;
        ctx.body = {
            status,
            body,
            message,
            code
        };
    },

    //生成token
    async createToken(data) {
        let { $config } = app;
        return await jwt.sign(data, $config.jwt.secret, { expiresIn: '1d' });
    },

    //验证token
    async verifyToken(token) {
        let { $config } = app;
        return await jwt.verify(token, $config.jwt.secret);
    },

    //用户密码加密
    async createPassword(password) {
        let { $config } = app;
        const salt = await bcryptjs.genSalt($config.bcrypt.saltRounds);
        return await bcryptjs.hash(password, salt);
    },

    //验证密码
    async verifyPassword(password, hash_password) {
        return await bcryptjs.compare(password, hash_password);
    },

    /**
     * 检测目录是否存在，不存在就创建一个新目录
     */
    async dirExists(dir) {
        let { helper } = app;
        let isExists = await getStat(dir);
        //如果路径存在，且不是文件，返回true
        if (isExists && isExists.isDirectory()) {
            return true;
        } else if (isExists) {        //如果路径存在，但是是文件，返回false
            return false;
        }

        //如果路径不存在
        let tempDir = path.parse(dir).dir;    //拿到上级路径
        //递归判断，如果上级目录不存在，则代码会在此处继续循环执行，直到目录存在为止，没有的目录都会一直创建
        let status = await helper.dirExists(tempDir);
        let mkdirStatus;
        if (status) mkdirStatus = await mkdir(dir);
        return mkdirStatus;
    },

    /**
     * 判断传入的数据是否是空值，如果是空值就返回true，非空值就是false
     * 同时，需要判断对象的空值以及单个对象的空值
     */
    isEmpty(data) {
        return (
            data === undefined ||
            data === null ||
            (typeof data === 'object' && Object.keys(data).length === 0) ||
            (typeof data === 'string' && data.trim().length === 0)
        )
    },

    /**
     * 生成公钥
     * @return {String} publicKey
     */
    async generatePublicKey() {
        const privateKey = getPrivateKey();
        const key = new NodeRSA(privateKey);
        key.setOptions({ encryptionScheme: 'pkcs1' });
        const publicKey = key.exportKey('pkcs1-public');
        return publicKey;
    },

    /**
     * 数据解密
     * @return {*}
     */
    async decryptData(data, publicKey) {
        const privateKey = getPrivateKey();
        const key = new NodeRSA(privateKey, { encryptionScheme: 'pkcs1' });
        const decryptedData = key.decrypt(data, 'utf8');
        return decryptedData;
    },

    /**
     * Postman 数据测试加密
     * @param {*} data 
     * @param {*} publicKey 
     */
    async encryptTestData(data) {
        const publicKey = await this.generatePublicKey();
        const key =new NodeRSA(publicKey, { encryptionScheme: 'pkcs1' });
        const encryptedData = key.encrypt(data, 'base64');
        return encryptedData;

    }
});


/**
 * 读取路径信息
 * @param {string} path //路径
 */
function getStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats);
            }
        })
    })
}

/**
 * 创建路径
 * @param {string} dir  //目录
 */

function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

/**
 * 获取私钥
 */
function getPrivateKey() {
    const privateKeyPath = path.join(__dirname, '../RSA/private.pem');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    return privateKey;
}