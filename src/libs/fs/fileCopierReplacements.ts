import { ReplacementOutputElementType } from "./fileCopier"
import { ReplacementOutputType } from "./fileCopier"

export const removeCommentsReplacement: ReplacementOutputElementType = [
  /\s*\/\/[^\n]+/g,
  "",
]

export const uncommentReplacement: ReplacementOutputElementType = [
  /([\s,]*)\/\/\s/g,
  (m: string, m0: string): string => m0.replace(/,/, ""),
]

export function removeViewReplacement(
  viewFnName: string
): ReplacementOutputElementType {
  return [`\n  return ${viewFnName}(input)`, ""]
}

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
