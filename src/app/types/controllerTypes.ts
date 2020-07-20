import { RouterInputType } from "../../framework/types/routerTypes"

export type ControllerInputType = RouterInputType

export type ControllerOutputType =
  | (Element | string)[]
  | Element
  | string
