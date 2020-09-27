import http from "http"
import httpServerStarter from "libs/httpServerStarter/httpServerStarter"

export async function startHttpTask(): Promise<
  http.Server
> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  return httpServerStarter(port)
}

export default startHttpTask
