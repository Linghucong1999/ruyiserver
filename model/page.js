module.exports = app => {
    const { mongoose } = app;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        title: { type: String, default: '项目未命名' },
        coverImage: { type: String, default: '' },
        description: { type: String, default: '无代码平台，从未如此简单' },
        shareConfig: {
            shareWx: { type: Boolean, default: false },
            coverImage: { type: String, default: '' },
            title: { type: String, default: '这是旅行者推荐' },
            description: { type: String, default: '这是旅行者推荐的页面' },
        },
        pages: Schema.Types.Mixed,
        script: { type: String, default: '' },  //第三方脚本
        author: {
            type: String,
            ref: 'user'
        },
        width: { type: Number, default: 375 },    //页面宽
        height: { type: Number, default: 617 },   //页面高
        pageMode: { type: String, default: 'H5' },    //渲染模式
        flipType: { type: Number, default: 0 },   //翻页模式
        slideNumber: { type: Boolean, default: false },   //翻页是否显示页码翻页指示
        add_time: Number,
        up_time: Number,
        status: { type: Number, enum: [0, 1], default: 1 }, //0不允许访问，1允许访问
        isPublish: { type: Boolean, default: false },   //发布状态
        isTemplate: { type: Boolean, default: false },
        members: [{
            type: String,
            ref: 'user'
        }], //共享人员列表
        version: {
            type: Number,
            default: 1
        }
    }, {
        timestamps: { createdAt: 'created', updateAt: 'updated' }
    })

    return mongoose.model('page', schema)
}