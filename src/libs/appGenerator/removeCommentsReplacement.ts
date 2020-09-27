import { ReplacementOutputElementType } from "libs/fileCopier/fileCopier"

export const removeCommentsReplacement: ReplacementOutputElementType = [
  /\s*\/\/[^\n]+/g,
  "",
]

export default removeCommentsReplacement
