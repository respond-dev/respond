import defaultImporter from "../lib/defaultImporter"
import promiseMapper from "../lib/promiseMapper"
import RouterInputType from "./routerInputType"
import RouterOutputType from "./routerOutputType"

export async function homeRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const { client, url } = input

  if (url.pathname !== "/") {
    return
  }

  const {
    articleModel,
    homeModel,
    homeView,
    layoutView,
  } = await defaultImporter({
    articleModel: import("../models/articleModel"),
    homeModel: import("../models/homeModel"),
    homeView: import("../views/homeView"),
    layoutView: import("../views/layoutView"),
  })

  const { article, home } = await promiseMapper({
    article: articleModel(input),
    home: homeModel(input),
  })

  const elements = layoutView({
    client,
    elements: homeView({
      ...article,
      ...home,
    }),
  })

  return { elements }
}

export default homeRouter
