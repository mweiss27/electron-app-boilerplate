const copyfiles = require("copyfiles")

const buildDir = "../../build/server/common"

const filesToCopy = ["package.json"]

copyfiles(
  [...filesToCopy, buildDir],
  {
    verbose: true,
  },
  err => {
    if (err) {
      console.error(err)
    }

    console.log("Files copied")
  }
)
