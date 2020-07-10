import { ReadStream } from "fs"
import { RequesterAdditionsType } from "../lib/requester"
import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "./middlewareTypes"

export type FinalizerInputType = MiddlewareInputType &
  MiddlewareOutputType &
  RequesterAdditionsType

export interface FinalizerOutputType {
  finalHttpCode?: number
  finalMimeType?: string
  finalOutput?: string
  finalStream?: ReadStream
}
