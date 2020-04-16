const path = require('path');

// Node.js export syntax
module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'   //purely for webpack-dev-server to know where to simulate placing in memory bundle.js
    },
    devtool: 'inline-source-map',
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
    }
};