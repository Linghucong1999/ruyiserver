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
    async psdUpload(ctx) {
        const { $config, helper } = app;
        try {
            const file = ctx.request.files.file;
            const psd = await PSD.open(file.filepath);
            const timeStr = new Date().getTime();
            const descendantsList = psd.tree().descendants().filter(layer => !layer.isGroup() && layer.visible).reverse();
            const currentPathDir = `/resource/upload_psd/${timeStr}`;

            await helper.dirExists(path.join(__dirname, '../public' + currentPathDir));
            const concurrencyLimit = 5;
            let runningPromises = [];
            let psdSourceList = [];
            for (let i = 0; i < descendantsList.length; i++) {
                if (runningPromises.length >= concurrencyLimit) {
                    await Promise.race(runningPromises);
                }

                const layer = descendantsList[i];
                const promise = layer.saveAsPng(path.join(__dirname, '../public' + currentPathDir + `/${i}.jpg`))
                    .then(() => {
                        psdSourceList.unshift({
                            ...layer.export(),
                            type: 'picture',
                            imageSrc: ($config.baseUrl || `http://127.0.0.1:${$config.port}`) + `${currentPathDir}/${i}.jpg`,
                            zIndex: i,
                        });
                    })
                    .catch(err => {
                        console.error(`图层${i}保存失败: ${err}`);
                    });
                runningPromises.push(promise);
                promise.finally(() => {
                    runningPromises = runningPromises.filter(p => p !== promise);
                });
            }
            await Promise.allSettled(runningPromises);
            helper.returnBody(ctx, true, {
                elements: psdSourceList,
                document: psd.tree().export()
            }, '解析成功');
        } catch (err) {
            console.log('psd上传失败...' + err);
            helper.returnBody(ctx, false, { elements: null, document: null }, '解析失败', 408);
        }
    }
})