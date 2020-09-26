// ⚠️ Use relative paths in this file!
//
import { dirname, join, relative } from "path"
import { ReplacementOutputElementType } from "../../libs/fs/fileCopier"
import srcDirNames from "../../libs/paths/srcDirNames"

export async function pathReplacements(
  jsPath: string,
  distPath: string
): Promise<ReplacementOutputElementType[]> {
  const srcNames = await srcDirNames()
  const relToSrc = relative(dirname(jsPath), distPath)

  return srcNames
    .map(
      (srcName): ReplacementOutputElementType => [
        new RegExp(`"${srcName}/`, "g"),
        `"${relToSrc}/${srcName}/`,
      ]
    )
    .concat([
      [
        new RegExp('"dist[/]', "g"),
        '"' + join(relToSrc, "../../dist/"),
      ],
    ])
    .concat([
      [
        new RegExp('"root[/]', "g"),
        '"' + join(relToSrc, "../../"),
      ],
    ])
    .concat([
      [
        new RegExp('"src[/]', "g"),
        '"' + join(relToSrc, "../../src/"),
      ],
    ])
}

export default pathReplacements
