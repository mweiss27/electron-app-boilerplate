const copyfiles = require("copyfiles")

const serverBuildDir = "../../build/server"
const electronBuildDir = "../../build/electron"

copyfiles(
  ["package.json", "package-lock.json", serverBuildDir],
  {
    verbose: true,
    up: true,
  },
  err => {
    if (err) {
      console.error(err)
    } else {
      console.log("Files copied")
    }
  }
)

copyfiles(
  ["assets/.electron-boilerplaterc", electronBuildDir],
  {
    verbose: true,
    up: true,
  },
  err => {
    if (err) {
      console.error(err)
    } else {
      console.log("Files copied")
    }
  }
)
