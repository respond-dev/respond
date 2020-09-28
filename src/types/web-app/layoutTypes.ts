import { RouterInputType } from "types/respond/routerTypes"

export type LayoutInputType = RouterInputType & {
  body: (Element | string)[] | Element | string
}

export type LayoutOutputType =
  | (Element | string)[]
  | Element
  | string
