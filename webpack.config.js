const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/scripts/main'),
    output: {
        path: path.resolve(__dirname, 'src/scripts'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
            },
        ],
    },
    node: {
        fs: 'empty',
        tls: 'empty'
    }
}
