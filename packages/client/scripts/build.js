const Webpack = require("webpack")
const webpackConfig = require("../webpack/client.webpack.production")

const compiler = Webpack(webpackConfig)

compiler.run((error, stats) => {
  if (error) {
    console.error(error)
  }

  compiler.close(closeError => {
    if (closeError) {
      console.error(closeError)
    }
  })
})
