import http from "http"
import httpServer from "lib/respond/httpServer"
import pipelinePaths from "lib/pipelines/pipelinePaths"
import requester from "lib/respond/requester"

export async function startHttpServer(
  port: number,
  devMode?: boolean
): Promise<http.Server> {
  const modules = await pipelinePaths("respond")

  return httpServer(
    port,
    devMode,
    async (incoming, response) => {
      const { respond } = await requester(modules, {
        httpIncomingMessage: incoming,
      })

      const { httpCode, mimeType, output } = respond

      if (httpCode) {
        response.statusCode = httpCode
      }

      if (mimeType) {
        response.setHeader("Content-Type", mimeType)
      }

      if (typeof output === "string") {
        response.write(output)
      } else if (output?.pipe) {
        output.pipe(response)
      } else {
        response.end()
      }
    }
  )
}

export default startHttpServer
