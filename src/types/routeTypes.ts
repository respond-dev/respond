import { RequesterAdditionsType } from "../lib/requester"
import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "./middlewareTypes"

export type RouteInputType = MiddlewareInputType &
  MiddlewareOutputType &
  RequesterAdditionsType

export type RouteOutputType = Element | Element[]