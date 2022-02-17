const { resolve } = require("path")

const rootPath = resolve(__dirname, "..")

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: resolve(rootPath, "src", "app.ts"),
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@common": resolve(rootPath, "..", "common"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  plugins: [],
  node: {
    __dirname: false,
  },
}
