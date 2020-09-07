import { access } from "fs"
import { constants } from "fs"
import { createReadStream } from "fs"
import { readFile } from "fs"
import { ReadStream } from "fs"
import { join } from "path"
import assetMatcher from "../../lib/respond/assetMatcher"
import { assetRegex } from "../../lib/respond/assetMatcher"
import { SettlerOutputType } from "../../types/respond/settlerTypes"

export const preSpaceRegex = /([^\w]|^)/

export async function assetRequester(
  urlPath: string,
  base64 = false
): Promise<SettlerOutputType> {
  const match = assetMatcher(urlPath)

  if (!match || !match[2]) {
    return
  }

  let [, name, ext] = match
  let map = ""

  if (ext === ".map") {
    map = ext
    ;[, name, ext] = name.match(assetRegex)
  }

  if (ext === ".mjs") {
    ext = ".js"
  }

  const path = join(
    __dirname,
    `../../../${name}${ext}${map}`
  )

  const exists = await new Promise((resolve) => {
    access(path, constants.F_OK, (err) => {
      err ? resolve(false) : resolve(true)
    })
  })

  if (exists) {
    let body: string
    let stream: ReadStream

    if (!base64 && ext === ".ttf") {
      stream = createReadStream(path)
    } else {
      body = await new Promise<string>(
        (resolve, reject) => {
          readFile(path, (err, data) => {
            err
              ? reject(err)
              : resolve(
                  data.toString(
                    base64 && ext === ".ttf"
                      ? "base64"
                      : "utf8"
                  )
                )
          })
        }
      )
    }

    let type = "text/javascript"

    if (ext === ".js") {
      body = replaceImports(body)
      body = replaceServerFunctions(body)
    }

    if (ext === ".css") {
      type = "text/css"
    }

    if (ext === ".ts") {
      type = "application/typescript"
    }

    if (ext === ".ttf") {
      type = "font/ttf"
    }

    if (map) {
      type = "application/json"
    }

    return {
      finalMimeType: type,
      finalOutput: body,
      finalStream: stream,
    }
  }
}

export function replaceImports(body: string): string {
  return body.replace(
    /([^\w]|^)(import|export)[\s(][^\("'=;\/]*["'][^'",]*["']/gim,
    (str) => {
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
    }
  )
}

export function replaceServerFunctions(
  body: string
): string {
  return body.replace(
    /([^\w]|^)server[A-Z][a-zA-Z]+\(/gm,
    (str) => {
      const [, space, name] = str.match(
        /([^\w]|^)(server[A-Z][a-zA-Z]+)\(/
      )
      return (
        space + `window.remoteModelRequester("${name}", `
      )
    }
  )
}

export default assetRequester
