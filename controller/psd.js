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
            const timeStr = new Date().getTime();
            const descendantsList = psd.tree().descendants();
            descendantsList.reverse();
            let psdSourceList = [];
            const currentPathDir = `/resource/upload_psd/${timeStr}`;
            await helper.dirExists(path.join(__dirname, '../public' + currentPathDir));
            // 批量保存图片并行处理
            await Promise.all(descendantsList.map(async (layer, i) => {
                if (layer.isGroup() || !layer.visible) return;
                try {
                    await layer.saveAsPng(path.join(__dirname, '../public' + currentPathDir + `/${i}.jpg`));
                    psdSourceList.push({
                        ...layer.export(),
                        type: 'picture',
                        imageSrc: ($config.baseUrl || `http://127.0.0.1:${$config.port}`) + `${currentPathDir}/${i}.jpg`,
                    });
                } catch (err) {
                    console.error(`图层${i}保存失败: ${err}`);
                }
            }));
            helper.returnBody(true, {
                elements: psdSourceList,
                document: psd.tree().export()
            }, '解析成功');
        } catch (err) {
            console.log('psd上传失败...' + err);
            helper.returnBody(false, { elements: null, document: null }, '解析失败', 408);
        }
    }
})