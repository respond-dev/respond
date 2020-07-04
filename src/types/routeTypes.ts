import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "./middlewareTypes"

export type RouteInputType = MiddlewareInputType &
  MiddlewareOutputType

export type RouteOutputType = Element | Element[]
