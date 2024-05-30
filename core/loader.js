const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const schedule = require('node-schedule');
const mongoose = require('mongoose');
const NodeRSA = require('node-rsa');

//自动扫描指定目录下面的文件并且加载
function scanFilesByFolder(dir, cb) {
    let _folder = path.resolve(__dirname, dir);
    if (!getFileStat(_folder)) {
        return;
    }

    try {
        const files = fs.readdirSync(_folder);
        files.forEach(file => {
            let filename = file.replace('.js', '');
            let oFileCnt = require(_folder + '/' + filename);
            cb && cb(filename, oFileCnt);
        })
    } catch (err) {
        console.log('文件加载失败....', err);
    }
}


//检测文件夹是否存在
/**
 * @param {string} path 路径
 */
function getFileStat(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (err) {
        return false;
    }
}

//配置信息
const initConfig = function () {
    let config = {};
    scanFilesByFolder('../config', (filename, content) => {
        config = { ...config, ...content };
    })
    return config;
}
// 加密信息
const initConfidential = function () {
    let confidential = {};
    scanFilesByFolder('../confidential', (filename, content) => {
        confidential = { ...confidential, ...content };
    });
    return confidential;
};

//初始化路由
const initRouter = function (app) {
    const router = new Router();
    require('../router.js')({ ...app, router });
    return router;
}


//初始控制器
const initController = function (app) {
    const controllers = {};
    scanFilesByFolder('../controller', (filename, controller) => {
        controllers[filename] = controller(app);
    })
    return controllers;
}

//初始化服务
function initService(app) {
    const service = {};
    scanFilesByFolder('../service', (filename, servicelist) => {
        service[filename] = servicelist(app);
    })
    return service;
}

//初始model
function initModel(app) {
    //连接数据库,配置数据库链接
    if (app.$config.mongodb) {
        mongoose.connect(app.$config.mongodb.url, app.$config.mongodb.options);

        //app上拓展两个属性
        app.$mongoose = mongoose;
        app.$db = mongoose.connection;

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, '数据库连接错误原因'));
        db.once('open', function () {
            console.log('数据库连接成功');
        });
        db.on('disconnected', function () {
            console.log('重连中');
            mongoose.connect(app.$config.mongodb.url, app.$config.mongodb.options);
        });
    }

    //初始化model文件
    let models = {};
    scanFilesByFolder('../model', (filename, modelconfig) => {
        models[filename] = modelconfig({ ...app, mongoose });
    })
    return models;
}

//初始化扩展
function initExtend(app) {
    scanFilesByFolder('../extend', (filename, extend) => {
        app[filename] = Object.assign(app[filename] || {}, extend(app));
    })
}

//初始化中间件middleware
function initMiddleware(app) {
    let middleware = {};
    scanFilesByFolder('../middleware', (filename, middlewareconfig) => {
        middleware[filename] = middlewareconfig(app);
    })

    //初始化配置中间件,在config中的配置项，让他时时刻刻都在启动校验
    if (app.$config.middleware && Array.isArray(app.$config.middleware)) {
        app.$config.middleware.forEach(item => {
            app.$app.use(middleware[item]);
        })
    }

    return middleware;
}

// 生成RSA私钥
function generateRsaKeyPair() {
    const key = new NodeRSA({ b: 1024 });
    key.setOptions({ encryptionScheme: 'pkcs1' });
    const privateKey = key.exportKey('pkcs1-private');
    const privateKeyPath = path.join(__dirname, '../RSA/private.pem');
    fs.writeFileSync(privateKeyPath, privateKey, 'utf8');
}


module.exports = {
    initConfig,
    initRouter,
    initController,
    initService,
    initModel,
    initExtend,
    initMiddleware,
    generateRsaKeyPair,
    initConfidential
}