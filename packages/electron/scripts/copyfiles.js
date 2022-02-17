const copyfiles = require("copyfiles")

const buildDir = "../../build/electron"

const filesToCopy = ["package.json", "package-lock.json"]

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
