import { MiddlewareInputType } from "./respond/middlewareTypes"
import { MiddlewareOutputType } from "./respond/middlewareTypes"

export type RouterInputType = MiddlewareInputType &
  MiddlewareOutputType

export interface RouterOutputType {
  output: (Element | string)[] | Element | string
}
