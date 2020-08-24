import { RouterInputType } from "./routerTypes"

export type LayoutInputType = RouterInputType

export type LayoutOutputType =
  | (Element | string)[]
  | Element
  | string
