// ⚠️ You have to use relative paths in this file!
//
import { basename, dirname, join, relative } from "path"
import fileCopier from "../../generators/lib/fileCopier"
import { directoryLister } from "../../pipelines/respond/lib/directoryLister"
import { deepDirectoryLister } from "../../pipelines/respond/lib/directoryLister"
import { ReplacementOutputElementType } from "../../generators/lib/fileCopier"

export async function pathFixer(): Promise<void> {
  const distCjsPath = join(__dirname, "../../")
  const distEsmPath = join(__dirname, "../../../dist-esm")

  const [srcDirs, cjsPaths, esmPaths] = await Promise.all([
    directoryLister(join(__dirname, "../../")),
    deepDirectoryLister(distCjsPath, null, ".js"),
    deepDirectoryLister(distEsmPath, null, ".js"),
  ])

  const srcDirNames = srcDirs.dirPaths.map((srcDir) =>
    basename(srcDir)
  )

  const pairs: [string, string[]][] = [
    [distCjsPath, cjsPaths.filePaths],
    [distEsmPath, esmPaths.filePaths],
  ]

  for (const [distPath, filePaths] of pairs) {
    for (const jsPath of filePaths) {
      const replacements = srcDirNames.map(
        (srcName): ReplacementOutputElementType => [
          new RegExp(`"${srcName}/`, "g"),
          `"${relative(
            dirname(jsPath),
            distPath
          )}/${srcName}/`,
        ]
      )
      await fileCopier(jsPath, jsPath, replacements)
    }
  }
}

export default pathFixer
