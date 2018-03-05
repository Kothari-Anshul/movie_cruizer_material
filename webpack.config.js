const path = require('path');

module.exports = {
    entry: './js/controller.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        
        
    },
    module: {
        rules: [{
            test: '/\.js$/',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }]
        }]
    }
};