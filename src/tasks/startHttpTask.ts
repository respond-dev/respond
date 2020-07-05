import http from "http"
import libHttpServer from "../lib/httpServer"
import modulesLister from "../lib/modulesLister"
import requester from "../lib/requester"

export async function startHttpTask(): Promise<
  http.Server
> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  const modules = await modulesLister()

  return libHttpServer(port, async (incoming, response) => {
    const output = await requester(modules, {
      httpIncomingMessage: incoming,
    })

    response.write(JSON.stringify(Object.keys(output)))
    response.end()
  })
}

export default startHttpTask
