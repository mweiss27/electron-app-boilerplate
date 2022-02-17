const Webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const webpackConfig = require("../webpack/client.webpack.development")

const compiler = Webpack(webpackConfig)
const devServerOptions = webpackConfig.devServer

const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(3000, "0.0.0.0", () => {
  console.log(`Client server listening on localhost:3000`)
})
