const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {

    entry: path.resolve(__dirname, 'src/index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },

    target: 'node',
    externals: nodeModules,
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],

}