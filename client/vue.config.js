const path = require("path");

module.exports = {
    baseUrl: path.resolve('/'),
    outputDir: path.resolve(__dirname, "../public/"),
    devServer: {
        proxy: 'http://localhost:3000'
    }

};