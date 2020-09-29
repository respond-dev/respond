import { ControllerInputType } from "types/web-app/controllerTypes"
import { ControllerOutputType } from "types/web-app/controllerTypes"
import promiseAll from "libs/promiseAll/promiseAll"
import homeModel from "../models/homeModel"
import homeView from "../views/homeView"

export async function homeController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  const { homeModelOutput } = await promiseAll({
    homeModelOutput: homeModel({}),
    homeStyle: input.css("apps/web/styles/homeStyle"),
  })
  return homeView({ ...input, homeModelOutput })
}

export default homeController
