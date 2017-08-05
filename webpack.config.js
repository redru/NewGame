const config = {
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
};

/*const EngineConfig = Object.assign({ }, config, {
    entry: './src/main.js',
    output: {
        filename: 'dist/engine.js'
    }
});*/

const GameConfig = Object.assign({ }, config, {
    entry: './scripts/Game.js',
    output: {
        filename: 'dist/game.js'
    }
});

module.exports = [/*EngineConfig, */GameConfig];
