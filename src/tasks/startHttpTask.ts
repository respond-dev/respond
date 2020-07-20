import http from "http"
import assetRequester from "../framework/lib/assetRequester"
import libHttpServer from "../framework/lib/httpServer"
import modulesLister from "../framework/lib/modulesLister"
import requester from "../framework/lib/requester"
import { SettlerOutputType } from "../framework/types/settlerTypes"

export async function startHttpTask(): Promise<
  http.Server
> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  const modules = await modulesLister()

  return libHttpServer(port, async (incoming, response) => {
    let output: SettlerOutputType

    output = await assetRequester(incoming.url)

    if (!output) {
      output = await requester(modules, {
        httpIncomingMessage: incoming,
      })
    }

    const {
      finalHttpCode,
      finalMimeType,
      finalOutput,
      finalStream,
    } = output

    if (finalHttpCode) {
      response.statusCode = finalHttpCode
    }

    if (finalMimeType) {
      response.setHeader("Content-Type", finalMimeType)
    }

    if (finalOutput) {
      response.write(finalOutput)
    }

    if (finalStream) {
      finalStream.pipe(response)
    } else {
      response.end()
    }
  })
}

export default startHttpTask
