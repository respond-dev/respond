import { extname, join } from "path"
import http from "http"
import chokidar from "chokidar"
import functionDebouncer from "./lib/functionDebouncer"

export async function watchDevHttpTask(): Promise<void> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  const { startHttpServer } = await import(
    "./lib/startHttpServer"
  )

  const server: http.Server = await startHttpServer(
    port,
    true
  )

  const restart = functionDebouncer(() =>
    restartHttpServer(server, port)
  )

  chokidar
    .watch(
      [
        join(__dirname, "../"),
        join(__dirname, "../../package-lock.json"),
      ],
      { ignoreInitial: true }
    )
    .on("all", async (e, path) => {
      if (extname(path) === ".js") {
        await restart()
      }
    })
}

export async function restartHttpServer(
  server: http.Server,
  port: number
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log("🚦 Restarting server...")

  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key]
  })

  return new Promise((resolve) =>
    server.close(async () => {
      const { startHttpServer } = await import(
        "./lib/startHttpServer"
      )

      server = await startHttpServer(port, true)

      // eslint-disable-next-line no-console
      console.log("🐸 Ready!")

      resolve()
    })
  )
}

export default watchDevHttpTask
