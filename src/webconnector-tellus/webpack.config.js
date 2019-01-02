const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require("path");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "development",
  entry: [
    "@babel/polyfill",
    "./src/index.js"
  ],
  output: {
    path: dist,
    filename: "bundle.js",
    publicPath: 'dist'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/static/' },
      { from: 'index.html' }
    ]),
    new WriteFilePlugin() // Allows using copy webpack plugin with dev server
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader:  "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                useBuiltIns: 'entry',
                "targets": {
                  // Don't know exact Tableau wdc version, but it's old, so IE6 will stand as an old browser stand in.
                  IE: 6
                },
                "debug": true
              }]
            ],
            plugins: [
              ["@babel/plugin-transform-spread"],
              ["@babel/plugin-transform-regenerator"]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: dist
  }
};
