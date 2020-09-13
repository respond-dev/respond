import { ReplacementOutputElementType } from "../../../generators/lib/fileCopier"

export const remoteModelReplacements: ReplacementOutputElementType = [
  /([^\w]|^)server[A-Z][a-zA-Z]+\(/gm,
  (str: string): string => {
    const [, space, name] = str.match(
      /([^\w]|^)(server[A-Z][a-zA-Z]+)\(/
    )
    return space + `window.remoteModelRequester("${name}", `
  },
]

export default remoteModelReplacements
