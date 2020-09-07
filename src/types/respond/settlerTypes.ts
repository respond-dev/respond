import { ReadStream } from "fs"
import { MiddlewareInputType } from "./middlewareTypes"
import { MiddlewareOutputType } from "./middlewareTypes"

export type SettlerInputType = MiddlewareInputType &
  MiddlewareOutputType

export interface SettlerOutputType {
  finalHttpCode?: number
  finalMimeType?: string
  finalOutput?: string
  finalStream?: ReadStream
}
