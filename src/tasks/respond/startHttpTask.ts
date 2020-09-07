import http from "http"
import startHttpServer from "./lib/startHttpServer"

export async function startHttpTask(): Promise<
  http.Server
> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  return startHttpServer(port)
}

export default startHttpTask
