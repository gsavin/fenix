const path          = require('path')
    , webpack       = require("webpack")
    , nodeExternals = require('webpack-node-externals');;

module.exports = {
    target: 'electron-renderer',
    externals: [
      nodeExternals()
    ],

    entry: "./app/lib/ui/init.js",

    output: {
        path: path.join(__dirname, 'app/lib/ui'),
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015']
              }
            },
        ]
    }
};
