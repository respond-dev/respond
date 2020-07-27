import { join } from "path"
import http from "http"
import chokidar from "chokidar"
import debounce from "./lib/debounce"
import startHttpServer from "./lib/startHttpServer"

export async function startDevHttpTask(): Promise<void> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  let server: http.Server = await startHttpServer(
    port,
    true
  )

  chokidar
    .watch(
      [
        join(__dirname, "../"),
        join(__dirname, "../package-lock.json"),
      ],
      { ignoreInitial: true }
    )
    .on(
      "all",
      debounce(async () => {
        // eslint-disable-next-line no-console
        console.log("🚦 Restarting server...")

        Object.keys(require.cache).forEach((key) => {
          delete require.cache[key]
        })

        if (server.listening) {
          server.close(async () => {
            server = await startHttpServer(port, true)
          })
        } else {
          server = await startHttpServer(port, true)
        }

        // eslint-disable-next-line no-console
        console.log("🐸 Ready!")
      })
    )
}

export default startDevHttpTask
