import { join } from "path"
import {
  access,
  constants,
  createReadStream,
  readFile,
  ReadStream,
} from "fs"

import { FinalizerOutputType } from "../types/finalizerTypes"

export const EXT_REGEX = /(.+)(\.[^\.]+)$/

export async function assetRequester(
  urlPath: string,
  base64 = false
): Promise<FinalizerOutputType> {
  const match = urlPath.match(EXT_REGEX)

  if (!match || !match[2]) {
    return
  }

  let [, name, ext] = match
  let map = ""

  if (ext === ".map") {
    map = ext
    ;[, name, ext] = name.match(EXT_REGEX)
  }

  if (ext === ".mjs") {
    ext = ".js"
  }

  const path = join(__dirname, `../../${name}${ext}${map}`)

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
      body = body.replace(
        /([^\w]|^)(import|export)[\s(][^\("'=;\/]*["'][^'",]*["']/gim,
        (str) =>
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

export default assetRequester
