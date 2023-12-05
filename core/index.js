/**
 * 封装koa MVC基础架构初始化工作
 */

const path = require('path');
const Koa = require('koa');
const { initConfig, initController, initService, initModel, initRouter, initExtend, initMiddleware } = require('./loader');

class Application {
    constructor() {
        this.$app = new Koa();

        //注册内置默认中间件
        this.initDefaultMiddleware();

        //初始化cofing
        this.$config = initConfig(this);
        //初始化service
        this.service = initService(this);
        //初始化控制器
        this.controller = initController(this);

        //初始化中间件
        this.middleware = initMiddleware(this);

        //初始化model
        this.model = initModel(this);
        //初始化路由
        this.$router = initRouter(this);

        //初始化扩展
        initExtend(this);



        this.$app.use(async (ctx, next) => {
            this.ctx = ctx;
            await next();
        })

        this.$app.use(this.$router.routes());
    }

    //设置内置中间件
    initDefaultMiddleware() {
        const koaStatic = require('koa-static');
        const { koaBody } = require('koa-body');
        const cors = require('koa2-cors');
        const views = require('koa-views');

        //配置静态WEB
        this.$app.use(koaStatic(path.resolve(__dirname, '../public')), {
            gzip: true, setHeaders: function (res) {
                res.header('Access-Control-Allow-Origin', '*');
            }
        })

        //跨域处理
        this.$app.use(cors());

        //req.body数据处理
        this.$app.use(koaBody({
            multipart: true,
            formidable: {
                maxFileSize: 3000 * 1024 * 1024 //限制上传30MB
            }
        }))

        //配置需要渲染的文件路径及文件后缀
        this.$app.use(views(path.join('__dirname', '../views'), {
            extension: 'ejs',
        }))
    }

    //启动服务
    start(port) {
        this.$app.listen(port, () => {
            console.log(`服务器开启:http://127.0.0.1:${port}`);
        })
    }
}

module.exports = Application;