import http from "http"
import httpServer from "lib/respond/httpServer"
import pipelinePaths from "lib/pipelines/pipelinePaths"
import pipeline from "lib/pipelines/pipeline"

export async function startHttpServer(
  port: number,
  devMode?: boolean
): Promise<http.Server> {
  const paths = await pipelinePaths("respond-app")

  return httpServer(
    port,
    devMode,
    async (incoming, response) => {
      const { respond } = await pipeline("respond-app", {
        input: { httpIncomingMessage: incoming },
        paths,
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
        response.end()
      } else if (output?.pipe) {
        output.pipe(response)
      } else {
        response.end()
      }
    }
  )
}

export default startHttpServer
