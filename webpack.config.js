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
        }
    }
];
