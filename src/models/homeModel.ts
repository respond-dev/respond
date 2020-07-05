import { RouteInputType } from "../types/routeTypes"

export interface HomeModelOutputType {
  home?: boolean
}

export function homeModel(
  input: RouteInputType
): HomeModelOutputType {
  return {}
}

export default homeModel
