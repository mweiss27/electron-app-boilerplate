const copyfiles = require("copyfiles")

const electronBuildDir = "../../build"
const serverBuildDir = "../../build/server"

copyfiles(
  ["package.json", serverBuildDir],
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
