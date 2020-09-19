import { MiddlewareInputType } from "./middlewareTypes"
import { MiddlewareOutputType } from "./middlewareTypes"
import { SettlerOutputType } from "./settlerTypes"

export type RouterInputType = MiddlewareInputType &
  MiddlewareOutputType

export type RouterOutputType = SettlerOutputType
