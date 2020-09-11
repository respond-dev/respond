import { ControllerInputType } from "../types/respond/controllerTypes"
import { ControllerOutputType } from "../types/respond/controllerTypes"
import promiseAll from "../lib/respond/promiseAll"
import aboutView from "../views/aboutView"
import serverAboutModel from "../models/serverAboutModel"

export async function aboutController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  const { aboutModelOutput } = await promiseAll({
    aboutModelOutput: serverAboutModel({}),
    aboutStyle: input.css("styles/aboutStyle"),
  })
  return aboutView({ ...input, aboutModelOutput })
}

export default aboutController
