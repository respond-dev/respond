import { extname, join } from "path"
import http from "http"
import chokidar from "chokidar"
import functionDebouncer from "./lib/functionDebouncer"

let server: http.Server

export async function watchDevHttpTask(): Promise<void> {
  const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000

  const { startHttpServer } = await import(
    "./lib/startHttpServer"
  )

  server = await startHttpServer(port, true)

  const restart = functionDebouncer(() =>
    restartHttpServer(port)
  )

  chokidar
    .watch(
      [
        join(__dirname, "tasks/../"),
        join(__dirname, "tasks/../package-lock.json"),
      ],
      {
        ignoreInitial: true,
      }
    )
    .on("all", async (e, path) => {
      if (extname(path) === ".js") {
        await restart()
      }
    })
}

export async function restartHttpServer(
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
