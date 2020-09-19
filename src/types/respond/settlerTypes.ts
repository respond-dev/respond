import { ReadStream } from "fs"
import { MiddlewareInputType } from "./middlewareTypes"
import { MiddlewareOutputType } from "./middlewareTypes"

export type SettlerInputType = MiddlewareInputType &
  MiddlewareOutputType

export interface SettlerOutputType {
  respond?: {
    binary?: boolean
    httpCode?: number
    mimeType?: string
    output?: string | ReadStream
  }
}
