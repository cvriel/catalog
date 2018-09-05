
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./signal.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.signal.js"
  }
};
