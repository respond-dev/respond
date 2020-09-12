import { RouterInputType } from "./routerTypes"

export type ControllerInputType = RouterInputType

export type ControllerOutputType =
  | (Element | string)[]
  | Element
  | string
