/**
 * psd解析
 * @param app
 * @return {{corsproxy():Promise<void>}}
 */

const path = require('path');
const PSD = require('psd');

module.exports = app => ({
    /**
     * 解析psd
     * @return {Promise<void>}
     */
    async psdUpload() {
        const { ctx, $config, helper } = app;
        try {
            const file = ctx.request.files.file;
            const psd = await PSD.open(file.filepath);
            const timeStr = new Date();
            const descendantsList = psd.tree().descendants();
            descendantsList.reverse();
            const psdSourceList = [];
            const currentPathDir = `/resource/upload_psd/${timeStr}`;

            // 判断文件夹是否存在,不存在就创建一个新的
        } catch (err) {
            console.log('psd上传失败...' + err);
        }
    }
})