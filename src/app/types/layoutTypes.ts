import { RouterInputType } from "../../framework/types/routerTypes"

export type LayoutInputType = RouterInputType

export type LayoutOutputType =
  | (Element | string)[]
  | Element
  | string
