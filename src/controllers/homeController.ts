import { ControllerInputType } from "../types/respond/controllerTypes"
import { ControllerOutputType } from "../types/respond/controllerTypes"
import promiseAll from "../lib/respond/promiseAll"
import homeModel from "../models/homeModel"
import homeView from "../views/homeView"

export async function homeController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  const { homeModelOutput } = await promiseAll({
    homeModelOutput: homeModel({}),
    homeStyle: input.css("styles/homeStyle"),
  })
  return homeView({ ...input, homeModelOutput })
}

export default homeController
