const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development', // Set mode to development or production
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new Dotenv({
            systemvars: true, // lets the plugin use environment variable from vercel instead of .env file
            silent: true,
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname),//serve index.html (remove 'dist' if index.html in root folder
        },
        open: true, //opens browser window automatically
    }
};