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
  finalOutput?: string
  finalMimeType?: string
}
