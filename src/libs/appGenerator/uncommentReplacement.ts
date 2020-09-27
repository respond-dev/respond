import { ReplacementOutputElementType } from "libs/fileCopier/fileCopier"

export const uncommentReplacement: ReplacementOutputElementType = [
  /([\s,]*)\/\/\s/g,
  (m: string, m0: string): string => m0.replace(/,/, ""),
]

export default uncommentReplacement
