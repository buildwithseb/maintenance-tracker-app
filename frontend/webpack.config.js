const path = require('path');

module.exports = {
    mode: 'development', // Set mode to development or production
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname),//serve index.html (remove 'dist' if index.html in root folder
        },
        open: true, //opens browser window automatically
    }
};