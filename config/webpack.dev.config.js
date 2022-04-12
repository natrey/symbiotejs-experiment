const path = require('path');

module.exports = {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, '..', 'dist'), 
        },
        hot: true,
        compress: true,
        port: 3000,
    },
};