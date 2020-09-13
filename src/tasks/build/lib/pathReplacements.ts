import { dirname, relative } from "path"
import { ReplacementOutputElementType } from "../../../generators/lib/fileCopier"
import srcDirNames from "./srcDirNames"

export async function pathReplacements(
  jsPath: string,
  distPath: string
): Promise<ReplacementOutputElementType[]> {
  const srcNames = await srcDirNames()
  return srcNames.map(
    (srcName): ReplacementOutputElementType => [
      new RegExp(`"${srcName}/`, "g"),
      `"${relative(dirname(jsPath), distPath)}/${srcName}/`,
    ]
  )
}

export default pathReplacements
