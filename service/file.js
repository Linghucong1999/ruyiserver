const fs = require('fs');
const path = require('path');

module.exports = app => ({
    /**
     * 单文件上传
     * @param file  上传的文件
     * @param folderPath 保存目标目录
     * @returns {Promise<{fileName:*,url:string}>}
     */
    async uploadFile(file, folderName) {
        let { $config, helper } = app;

        let fileData = fs.readFileSync(file.filepath);  //读取文件

        //将文件存到指定位置
        let folderPath = path.resolve(__dirname, '../public/resource/', folderName);
        await helper.dirExists(folderPath);
        let filePath = path.join(folderPath, file.originalFilename);
        fs.writeFileSync(filePath, fileData);
        return {
            fileName: file.originalFilename,
            url: $config.baseUrl + `/resource/${folderName ? folderName + '/' : ''}${file.originalFilename}`
        }
    }
})