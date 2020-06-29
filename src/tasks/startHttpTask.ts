import http from "http"
import libHttpServer from "../lib/httpServer"
import requester from "../lib/requester"

export async function startHttpTask(): Promise<
  http.Server
> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  return libHttpServer(port, async (incoming, response) => {
    const result = await requester({
      httpIncomingMessage: incoming,
    })

    response.write(result)
    response.end()
  })
}

export default startHttpTask
