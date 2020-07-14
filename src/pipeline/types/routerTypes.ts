import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "./middlewareTypes"

export type RoutesType = [
  string | RegExp, // matcher
  string, // controller
  string? // layout
][]

export type RouterInputType = MiddlewareInputType &
  MiddlewareOutputType

export interface RouterOutputType {
  output: (Element | string)[] | Element | string
}
