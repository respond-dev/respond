import { join } from "path"
import { createReadStream } from "fs"
import { ReadStream } from "fs"
import { pathExists } from "fs-extra"
import { readFile } from "fs-extra"
import extMatcher from "pipelines/respond/lib/extMatcher"
import { MiddlewareInputType } from "pipelines/respond/types/middlewareTypes"
import { SettlerOutputType } from "pipelines/respond/types/settlerTypes"
import mime from "mime/lite"

const binaryFileExtensions = [
  "dds",
  "eot",
  "gif",
  "ico",
  "jar",
  "jpeg",
  "jpg",
  "pdf",
  "png",
  "swf",
  "tga",
  "ttf",
  "zip",
]

export async function serverAssetMiddleware({
  apiGatewayProxyEvent,
  httpIncomingMessage,
}: MiddlewareInputType): Promise<SettlerOutputType> {
  let urlPath = httpIncomingMessage
    ? httpIncomingMessage.url
    : apiGatewayProxyEvent.path

  const ext = extMatcher(urlPath)
  const isLambda = !!apiGatewayProxyEvent

  if (!ext) {
    return
  }

  if (ext === "mjs") {
    urlPath = urlPath.replace(/\.mjs$/, ".js")
  }

  const path = join(__dirname, "/src", urlPath)

  if (await pathExists(path)) {
    let body: string
    let stream: ReadStream

    const isBinary = binaryFileExtensions.includes(ext)
    const mimeType = mime.getType(ext)

    if (!isLambda && isBinary) {
      stream = createReadStream(path)
    } else {
      body = (await readFile(path)).toString(
        isLambda && isBinary ? "base64" : "utf8"
      )
    }

    return {
      finalMimeType: mimeType,
      finalOutput: body,
      finalStream: stream,
    }
  }
}

export default serverAssetMiddleware
