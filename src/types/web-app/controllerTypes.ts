import { RouterInputType } from "types/respond/routerTypes"

export type ControllerInputType = RouterInputType

export type ControllerOutputType =
  | (Element | string)[]
  | Element
  | string
