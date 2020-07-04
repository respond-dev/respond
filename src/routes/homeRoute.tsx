import promiseAll from "../lib/promiseAll"
import promiseAllDefault from "../lib/promiseAllDefault"
import {
  RouteInputType,
  RouteOutputType,
} from "../types/routeTypes"

export async function homeRoute(
  input: RouteInputType
): Promise<RouteOutputType> {
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

export default homeRoute
