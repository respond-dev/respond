import { RouterInputType } from "../pipeline/types/routerTypes"

export interface ArticleModelOutputType {
  article?: boolean
}

export function articleModel(
  input: RouterInputType
): ArticleModelOutputType {
  return {}
}

export default articleModel
