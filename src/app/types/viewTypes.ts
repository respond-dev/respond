import { ControllerInputType } from "./controllerTypes"

export type ViewInputType = ControllerInputType

export type ViewOutputType =
  | (Element | string)[]
  | Element
  | string
