import { ReplacementOutputElementType } from "libs/fileCopier/fileCopier"

export function removeViewReplacement(
  viewFnName: string
): ReplacementOutputElementType {
  return [`\n  return ${viewFnName}(input)`, ""]
}

export default removeViewReplacement
