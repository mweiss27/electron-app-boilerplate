const { resolve } = require("path")
const { merge } = require("webpack-merge")
const common = require("./client.webpack.common")

const rootPath = resolve(__dirname, "..")
const outputDir = resolve(rootPath, "build")

module.exports = merge(common(outputDir), {
  mode: "development",
  devServer: {
    static: {
      directory: outputDir,
    },
    port: 3000,
    hot: true,
  },
})
