const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require("path");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "development",
  entry: {
    tellus: ["@babel/polyfill", "./src/tellus.js"],
    afval: ["@babel/polyfill", "./src/afval.js"],
  },
  output: {
    path: dist,
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/static/' },
      { from: 'tellus.html' },
      { from: 'afval.html' },
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
                  // Don't know exact Tableau wdc version, but it's old, so IE6 will stand in as an "old" browser.
                  // From Tableau 2019.2 a chromium based browser is used. That should make it a lot more resilient
                  // and potent. -src: https://tableau.github.io/webdataconnector/news/#the-reason-for-this-change
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
