import {
  ControllerInputType,
  ControllerOutputType,
} from "../types/controllerTypes"
import exampleView from "../views/exampleView"
// import injection placeholder

export async function exampleController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  // controller injection placeholder
  return exampleView({})
}

export default exampleController
