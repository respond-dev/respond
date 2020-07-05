import { RequesterAdditionsType } from "../lib/requester"
import { RouteInputType } from "./routeTypes"

export type LayoutInputType = RouteInputType &
  RequesterAdditionsType

export type LayoutOutputType = Element | Element[]
