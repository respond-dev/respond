import http from "http"
import libHttpServer from "../lib/httpServer"
import requester from "../lib/requester"

export async function httpServer(
  port: number
): Promise<http.Server> {
  return libHttpServer(port, async (incoming, response) => {
    const result = await requester({
      httpIncomingMessage: incoming,
    })
    response.write(JSON.stringify(result))
    response.end()
  })
}

httpServer(3000)
