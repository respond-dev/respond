import http, { IncomingMessage, ServerResponse } from "http"
import { performance } from "perf_hooks"
import logger from "./logger"

let shutdown = false

export function shutdownHandler(server: http.Server) {
  return (err: string | Error): void => {
    shutdown = true

    if (typeof err === "string") {
      logger({ signal: err })
    } else if (err) {
      logger({
        message: err.message,
        trace: err.stack,
      })
    }

    server.close((e) => {
      if (e) {
        logger({
          message: e.message,
          trace: e.stack,
        })
      }

      process.exit(err || e ? 1 : 0)
    })
  }
}

export async function httpServer(
  port: number,
  devMode: boolean,
  request: (
    req: IncomingMessage,
    res: ServerResponse
  ) => Promise<any>
): Promise<http.Server> {
  return new Promise((resolve, reject) => {
    const server = http
      .createServer(
        async (
          req: IncomingMessage,
          res: ServerResponse
        ): Promise<void> => {
          const now = performance.now()

          if (shutdown) {
            res.statusCode = 503
            res.end()
          } else {
            try {
              await request(req, res)

              const time = performance.now() - now

              logger({
                status: res.statusCode,
                type: res.getHeader("Content-Type"),
                url: req.url,
                ms: Math.round(time * 1000) / 1000,
              })
            } catch (e) {
              logger({
                message: e.message,
                stack: e.stack,
              })
              reject(e)
            }
          }
        }
      )
      .listen(port, () => {
        logger({ listen: `http://localhost:${port}` })
        resolve(server)
      })

    if (!devMode) {
      process.once("SIGINT", shutdownHandler(server))
      process.once("SIGTERM", shutdownHandler(server))
      process.once(
        "uncaughtException",
        shutdownHandler(server)
      )
      process.once(
        "unhandledRejection",
        shutdownHandler(server)
      )
    }
  })
}

export default httpServer
