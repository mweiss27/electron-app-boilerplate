const { resolve } = require("path")
const { merge } = require("lodash")
const { writeJSON } = require("fs-extra")

const serverPackageJsonPath = resolve("./build/server/package.json")
const commonPackageJsonPath = resolve("./build/server/common/package.json")
const electronServerJsonPath = resolve("./build/package.json")

const serverPackageJson = require(serverPackageJsonPath)
const commonServerJson = require(commonPackageJsonPath)
const electronServerJson = require(electronServerJsonPath)

const mergedDependencies = merge(
  commonServerJson.dependencies,
  electronServerJson.dependencies,
  serverPackageJson.dependencies
)

electronServerJson.dependencies = mergedDependencies

writeJSON(electronServerJsonPath, electronServerJson, { replacer: null, spaces: 2 }, error => {
  if (error) {
    console.error(`Failed to merge dependencies: `, error.message || error)
  }

  console.log(`Dependencies merged successfully`)
})
