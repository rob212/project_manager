const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

// Node.js export syntax
module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',   // ts-loader will use our tsconfig.json settings by default
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']  // look for all files with .ts & .js extensions
    },
    plugins: [
        // plugin to always delete contents of dist folder before running webpack
        new CleanPlugin.CleanWebpackPlugin()
    ]
};