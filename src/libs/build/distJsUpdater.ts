// ⚠️ Use relative paths in this file!
//
import { join, relative } from "path"
import fileCopier from "../../libs/fs/fileCopier"
import { deepDirectoryLister } from "../../libs/fs/directoryLister"
import importReplacements from "./importReplacements"
import pathReplacements from "./pathReplacements"
import remoteModelReplacements from "./remoteModelReplacements"

const distCjsTsPath = join(__dirname, "../../../cjs-ts")
const distEsmTsPath = join(__dirname, "../../../esm-ts")
const distCjsPath = join(__dirname, "../../../cjs")
const distEsmPath = join(__dirname, "../../../esm")

export async function distJsUpdater(): Promise<void> {
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
      await distJsSingleUpdater(
        target,
        jsPath,
        distPath,
        distTsPath
      )
    }
  }
}

export async function distJsSingleUpdater(
  target: string,
  jsPath: string,
  distPath: string,
  distTsPath: string
): Promise<void> {
  let replacements = await pathReplacements(
    jsPath,
    distPath
  )

  if (target === "esm") {
    replacements = replacements
      .concat([importReplacements])
      .concat([remoteModelReplacements])
  }

  const relJsPath = relative(distTsPath, jsPath)

  await fileCopier(
    jsPath,
    join(distPath, relJsPath),
    replacements
  )
}

export default distJsUpdater
