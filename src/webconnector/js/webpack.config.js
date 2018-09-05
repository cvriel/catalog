
const path = require("path");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./signal.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.signal.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader:  "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
            //presets: ["es2015"]
          }
        }
      }
    ]
  }
};
