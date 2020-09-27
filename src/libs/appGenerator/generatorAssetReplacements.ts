import { ReplacementOutputType } from "libs/fileCopier/fileCopier"

export function generatorAssetReplacements(
  name: string,
  newName: string,
  pluralName: string
): ReplacementOutputType {
  const replacements = []

  // space before name except when followed by colon (:)
  replacements.push([
    new RegExp(" " + name + "(?!:)", "g"),
    " " + newName,
  ])

  // name in path
  replacements.push([
    new RegExp("/" + name + '"', "g"),
    "./" + pluralName + "/" + newName + '"',
  ])

  // quoted name
  replacements.push([
    new RegExp('"' + name + '"', "g"),
    '"' + newName + '"',
  ])

  return replacements
}

export default generatorAssetReplacements
