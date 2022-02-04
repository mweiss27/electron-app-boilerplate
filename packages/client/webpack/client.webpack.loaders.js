const tsLoader = {
  test: /\.tsx?$/,
  loader: "ts-loader",
  options: {
    transpileOnly: true,
    experimentalWatchApi: true,
  },
}

const fileLoader = {
  test: /\.(jpe?g|png|gif)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "img/[name]__[hash:base64:5].[ext]",
    },
  },
}

const rawLoader = {
  test: /\.svg$/,
  loader: "raw-loader",
}

const cssLoader = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
}

const scssLoader = {
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
}

module.exports = {
  tsLoader,
  fileLoader,
  rawLoader,
  cssLoader,
  scssLoader,
}
