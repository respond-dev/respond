import { ControllerInputType } from "types/controllerTypes"
import { ControllerOutputType } from "types/controllerTypes"
// import promiseAll from "libs/promiseAll/promiseAll"
// import model from "./model"
import view from "./view"

export async function controller(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  // const { modelOutput } = await promiseAll({
  //   modelOutput: model({}),
  // })
  // return view({ ...input, modelOutput })
  return view(input)
}

export default controller
