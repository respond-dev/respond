import { ReadStream } from "fs"
import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "./middlewareTypes"

export type SettlerInputType = MiddlewareInputType &
  MiddlewareOutputType

export interface SettlerOutputType {
  finalHttpCode?: number
  finalMimeType?: string
  finalOutput?: string
  finalStream?: ReadStream
}
