const { resolve, join } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const { tsLoader, fileLoader, rawLoader, cssLoader, scssLoader } = require("./client.webpack.loaders")

const rootPath = resolve(__dirname, "..")

module.exports = outputDir => ({
  mode: "production",
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
      title: "Electron Boilerplate",
      custom: ``,
      template: join(rootPath, "webpack", "./index-template.html"),
    }),
  ],
})
