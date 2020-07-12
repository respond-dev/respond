import { RouterInputType } from "../pipeline/types/routerTypes"

export type LayoutInputType = RouterInputType

export type LayoutOutputType =
  | (Element | string)[]
  | Element
  | string
