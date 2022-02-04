const { resolve, join } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const { tsLoader, fileLoader, rawLoader, cssLoader, scssLoader } = require("./client.webpack.loaders")

const rootPath = resolve(__dirname, "..")
const outputDir = resolve(rootPath, "build")

module.exports = {
  mode: "development",
  target: "electron-renderer",
  entry: resolve(rootPath, "src", "index.tsx"),
  output: {
    path: outputDir,
    filename: "[name]-bundle.js",
    pathinfo: false,
  },
  module: {
    rules: [tsLoader, fileLoader, rawLoader, cssLoader, scssLoader],
  },
  resolve: {
    alias: {
      "@common": resolve(rootPath, "..", "common"),
      domain: resolve(rootPath, "src", "domain"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: join(outputDir, "index.html"),
      title: "Finance Tracker",
      custom: ``,
      template: join(rootPath, "webpack", "./index-template.html"),
    }),
  ],
  devServer: {
    static: {
      directory: outputDir
    },
    port: 3000,
    hot: true,
  },
}
