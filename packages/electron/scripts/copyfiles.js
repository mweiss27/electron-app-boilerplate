const copyfiles = require("copyfiles")

const buildDir = "../../build"

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
