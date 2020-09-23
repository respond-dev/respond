import { join } from "path"
import { createReadStream } from "fs"
import { ReadStream } from "fs"
import { pathExists } from "fs-extra"
import { readFile } from "fs-extra"
import binaryExtensions from "lib/paths/binaryExtensions"
import extMatcher from "lib/respond/extMatcher"
import { MiddlewareInputType } from "types/respond/middlewareTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import mime from "mime/lite"

export async function serverAssetMiddleware({
  apiGatewayProxyEvent,
  httpIncomingMessage,
  testRequest,
}: MiddlewareInputType): Promise<SettlerOutputType> {
  let urlPath: string

  if (httpIncomingMessage) {
    urlPath = httpIncomingMessage.url
  } else if (apiGatewayProxyEvent) {
    urlPath = apiGatewayProxyEvent.path
  } else if (testRequest) {
    urlPath = testRequest.path
  }

  const ext = extMatcher(urlPath)
  const isLambda = !!apiGatewayProxyEvent

  if (!ext) {
    return
  }

  if (ext === "map") {
    urlPath = urlPath.replace(/\/esm\//, "/esm-ts/")
  } else if (ext === "mjs") {
    urlPath = urlPath.replace(/\.mjs$/, ".js")
  }

  const path = join(__dirname, "root/", urlPath)

  if (await pathExists(path)) {
    let body: string
    let stream: ReadStream

    const isBinary = binaryExtensions.includes(ext)
    const mimeType = mime.getType(ext)

    if (!isLambda && isBinary) {
      stream = createReadStream(path)
    } else {
      body = (await readFile(path)).toString(
        isLambda && isBinary ? "base64" : "utf8"
      )
    }

    return {
      respond: {
        binary: isBinary,
        mimeType: mimeType,
        output: body || stream,
      },
    }
  }
}

export default serverAssetMiddleware
