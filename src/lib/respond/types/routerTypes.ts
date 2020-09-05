import { MiddlewareInputType } from "./middlewareTypes"
import { MiddlewareOutputType } from "./middlewareTypes"

export type RouterInputType = MiddlewareInputType &
  MiddlewareOutputType

export interface RouterOutputType {
  output: (Element | string)[] | Element | string
}
