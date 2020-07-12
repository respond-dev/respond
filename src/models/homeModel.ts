import { RouterInputType } from "../pipeline/types/routerTypes"

export interface HomeModelOutputType {
  home?: boolean
}

export function homeModel(
  input: RouterInputType
): HomeModelOutputType {
  return {}
}

export default homeModel
