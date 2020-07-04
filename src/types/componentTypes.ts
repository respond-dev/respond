import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "./middlewareTypes"

export type ComponentInputType = MiddlewareInputType &
  MiddlewareOutputType

export type ComponentOutputType = Element | Element[]
