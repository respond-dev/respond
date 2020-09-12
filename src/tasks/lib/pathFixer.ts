// ⚠️ You have to use relative paths in this file!
//
import { basename, dirname, join, relative } from "path"
import fileCopier from "../../generators/lib/fileCopier"
import { directoryLister } from "../../pipelines/respond/lib/directoryLister"
import { deepDirectoryLister } from "../../pipelines/respond/lib/directoryLister"
import { ReplacementOutputElementType } from "../../generators/lib/fileCopier"

let srcDirNamesCache: string[]

export async function pathFixer(): Promise<void> {
  const distCjsPath = join(__dirname, "../../")
  const distEsmPath = join(__dirname, "../../../dist-esm")

  const [cjsPaths, esmPaths] = await Promise.all([
    deepDirectoryLister(distCjsPath, null, ".js"),
    deepDirectoryLister(distEsmPath, null, ".js"),
  ])

  const pairs: [string, string[]][] = [
    [distCjsPath, cjsPaths.filePaths],
    [distEsmPath, esmPaths.filePaths],
  ]

  for (const [distPath, filePaths] of pairs) {
    for (const jsPath of filePaths) {
      await singlePathFixer(jsPath, distPath)
    }
  }
}

export async function srcDirNames(): Promise<string[]> {
  if (srcDirNamesCache) {
    return srcDirNamesCache
  }
  const dirs = await directoryLister(
    join(__dirname, "../../")
  )
  srcDirNamesCache = dirs.dirPaths.map((srcDir) =>
    basename(srcDir)
  )
  return srcDirNamesCache
}

export async function singlePathFixer(
  jsPath: string,
  distPath: string
): Promise<void> {
  const srcNames = await srcDirNames()
  const replacements = srcNames.map(
    (srcName): ReplacementOutputElementType => [
      new RegExp(`"${srcName}/`, "g"),
      `"${relative(dirname(jsPath), distPath)}/${srcName}/`,
    ]
  )
  await fileCopier(jsPath, jsPath, replacements)
}

export default pathFixer
