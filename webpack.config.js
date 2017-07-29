module.exports = [
    {
        entry: './src/main.js',
        output: {
            filename: 'dist/engine.js'
        }
    },
    {
        entry: './scripts/Game.js',
        output: {
            filename: 'dist/game.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                }
            ]
        }
    }
];
