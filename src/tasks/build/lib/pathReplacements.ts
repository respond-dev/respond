// ⚠️ Use relative paths in this file!
//
import { dirname, join, relative } from "path"
import { ReplacementOutputElementType } from "../../../generators/lib/fileCopier"
import srcDirNames from "./srcDirNames"

export async function pathReplacements(
  jsPath: string,
  distPath: string
): Promise<ReplacementOutputElementType[]> {
  const srcNames = await srcDirNames()
  const relToSrc = relative(dirname(jsPath), distPath)
  return srcNames
    .map(
      (srcName): ReplacementOutputElementType => [
        `"${srcName}/`,
        `"${relToSrc}/${srcName}/`,
      ]
    )
    .concat([["root/", join(relToSrc, "../../")]])
    .concat([["src/", relToSrc]])
}

export default pathReplacements
