import ModelInputType from "./modelInputType"

export interface HomeModelOutputType {
  home?: boolean
}

export function homeModel(
  input: ModelInputType
): HomeModelOutputType {
  return {}
}

export default homeModel
