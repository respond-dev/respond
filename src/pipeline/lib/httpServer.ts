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

export function httpServer(
  port: number,
  request: (
    req: IncomingMessage,
    res: ServerResponse
  ) => Promise<any>
): http.Server {
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
          }
        }
      }
    )
    .listen(port, () =>
      logger({ listen: `http://localhost:${port}` })
    )

  process.once("SIGINT", shutdownHandler(server))
  process.once("SIGTERM", shutdownHandler(server))
  process.once("uncaughtException", shutdownHandler(server))
  process.once(
    "unhandledRejection",
    shutdownHandler(server)
  )

  return server
}

export default httpServer
