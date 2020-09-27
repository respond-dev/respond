// ⚠️ Use relative paths in this file!
//
import { join } from "path"
import deepDirectoryLister from "../../libs/directoryLister/deepDirectoryLister"
import distJsSingleReplacer from "./distJsSingleReplacer"

const distCjsTsPath = join(__dirname, "../../../cjs-ts")
const distEsmTsPath = join(__dirname, "../../../esm-ts")
const distCjsPath = join(__dirname, "../../../cjs")
const distEsmPath = join(__dirname, "../../../esm")

export async function distJsReplacer(): Promise<void> {
  const [cjsPaths, esmPaths] = await Promise.all([
    deepDirectoryLister(distCjsTsPath, null, ".js"),
    deepDirectoryLister(distEsmTsPath, null, ".js"),
  ])

  const paths: [string, string, string, string[]][] = [
    ["cjs", distCjsPath, distCjsTsPath, cjsPaths.filePaths],
    ["esm", distEsmPath, distEsmTsPath, esmPaths.filePaths],
  ]

  for (const [
    target,
    distPath,
    distTsPath,
    filePaths,
  ] of paths) {
    for (const jsPath of filePaths) {
      await distJsSingleReplacer(
        target,
        jsPath,
        distPath,
        distTsPath
      )
    }
  }
}

export default distJsReplacer
