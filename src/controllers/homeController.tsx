import promiseAll from "../pipeline/lib/promiseAll"
import promiseAllDefault from "../pipeline/lib/promiseAllDefault"
import {
  ControllerInputType,
  ControllerOutputType,
} from "../types/controllerTypes"

export async function homeController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
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

export default homeController
