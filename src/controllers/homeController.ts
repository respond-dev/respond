import defaultImporter from "../lib/defaultImporter"
import promiseMapper from "../lib/promiseMapper"
import ControllerInputType from "./controllerInputType"
import ControllerOutputType from "./controllerOutputType"

export async function homeController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
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

export default homeController
