import promiseAll from "../lib/promiseAll"
import promiseAllDefault from "../lib/promiseAllDefault"
import ComponentInputType from "./componentInputType"
import ComponentOutputType from "./componentOutputType"

export const homeComponentId = "home"

export async function homeComponent(
  input: ComponentInputType
): Promise<ComponentOutputType> {
  const { url } = input

  if (url.pathname !== "/") {
    return
  }

  const {
    articleModel,
    homeModel,
    homeView,
  } = await promiseAllDefault({
    articleModel: import("../models/articleModel"),
    homeModel: import("../models/homeModel"),
    homeView: import("../views/homeView"),
  })

  const { article, home } = await promiseAll({
    article: articleModel(input),
    home: homeModel(input),
  })

  return homeView({
    ...article,
    ...home,
  })
}

export default homeComponent
