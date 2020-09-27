// ⚠️ Use relative paths in this file!
//
import { join, relative } from "path"
import fileCopier from "../../libs/fileCopier/fileCopier"
import importReplacements from "./replacements/importReplacements"
import pathReplacements from "./replacements/pathReplacements"
import remoteModelReplacements from "./replacements/remoteModelReplacements"

export async function distJsSingleReplacer(
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

export default distJsSingleReplacer
