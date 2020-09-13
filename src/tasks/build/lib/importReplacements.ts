import { ReplacementOutputElementType } from "../../../generators/lib/fileCopier"

export const preSpaceRegex = /([^\w]|^)/

export const importReplacements: ReplacementOutputElementType = [
  /([^\w]|^)(import|export)[\s(][^\("'=;\/]*["'][^'",]*["']/gim,
  (str: string): string => {
    if (str.match(/\.mjs/)) {
      return str
    }
    if (str.match(/server[A-Z][a-zA-Z]+["']$/)) {
      return str.match(preSpaceRegex)[0]
    } else {
      return (
        str
          .slice(0, -1)
          .replace(
            /"tslib$/,
            '"/node_modules/tslib/tslib.es6'
          )
          .replace(
            /[\.\/]+\/node_modules\//,
            "/node_modules/"
          )
          .replace(/\.js$/, "") +
        ".mjs" +
        str[str.length - 1]
      )
    }
  },
]

export default importReplacements
