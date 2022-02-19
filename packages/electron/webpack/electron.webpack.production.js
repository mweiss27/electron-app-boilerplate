const { resolve, join } = require("path")
const { merge } = require("webpack-merge")
const common = require("./electron.webpack.common")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const rootPath = resolve(__dirname, "..")
const outputDir = resolve(rootPath, "..", "..", "build")

module.exports = merge(common, {
  mode: "production",
  output: {
    path: outputDir,
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: [],
      filename: resolve(outputDir, "index-nestjs.html"),
      title: "NestJS Browser",
      custom: ``,
      template: join(rootPath, "webpack", "./index-template-nestjs.html"),
    }),
  ],
})
