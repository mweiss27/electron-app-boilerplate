const { resolve } = require("path")
const { merge } = require("webpack-merge")
const common = require("./client.webpack.common")

const rootPath = resolve(__dirname, "..")
const outputDir = resolve(rootPath, "..", "..", "build", "client")

module.exports = merge(common(outputDir), {
  mode: "production",
})
