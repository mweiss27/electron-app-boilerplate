const { resolve } = require("path")
const { merge } = require("webpack-merge")
const common = require("./electron.webpack.common")

const rootPath = resolve(__dirname, "..")

module.exports = merge(common, {
  mode: "development",
  output: {
    path: resolve(rootPath, "build"),
    filename: "[name].js",
  },
})
