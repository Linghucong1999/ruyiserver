const path = require('path');
const { createWriteStream, createReadStream } = require('fs');

//接收前端上传zip文件到public内部
module.exports = app => ({
    async upload(ctx) {
        const { $config, helper } = app;
        const file = ctx.request.files.file;
        try {
            const timeStr = new Date().getTime();
            const uploadPath = path.join(__dirname, '../public/zip/' + timeStr);
            await helper.dirExists(uploadPath);
            const writeStream = createWriteStream(uploadPath + '/' + file.originalFilename, {
                flags: 'w',
                autoClose: true,
                highWaterMark: 3,
            });
            const readStream = createReadStream(file.filepath);
            readStream.on('data', chunk => {
                if (!writeStream.write(chunk)) {
                    readStream.pause();
                }
            });
            readStream.on('end', () => {
                writeStream.end();
                console.log('文件上传完成');
            });
            writeStream.on('drain', () => {
                readStream.resume();
            });
            writeStream.on('finish', () => {
                console.log('进入finish流程');
                helper.returnBody(ctx, true, {
                    path: ($config.baseUrl || `http://127.0.0.1:${$config.port}`) + `${uploadPath}` + file.originalFilename
                }, "上传成功");
            });
            writeStream.on('close', () => {
                console.log('流关闭');
            });
            writeStream.on('error', err => {
                console.log("写入过程中" + err);
                helper.returnBody(ctx, true, {}, "上传失败");
            });
            readStream.on('error', err => {
                console.log("读取过程中" + err);
                helper.returnBody(ctx, true, {}, "上传失败");
                writeStream.destroy();
            });
        } catch (err) {
            console.log(err);
            helper.returnBody(ctx, true, {}, "上传失败");
        }
    }
})