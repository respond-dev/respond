import http from "http"
import httpServer from "pipelines/respond/lib/httpServer"
import pipelinePaths from "pipelines/lib/pipelinePaths"
import requester from "pipelines/respond/lib/requester"

export async function startHttpServer(
  port: number,
  devMode?: boolean
): Promise<http.Server> {
  const modules = await pipelinePaths("respond")

  return httpServer(
    port,
    devMode,
    async (incoming, response) => {
      const output = await requester(modules, {
        httpIncomingMessage: incoming,
      })

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
    }
  )
}

export default startHttpServer
