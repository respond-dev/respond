import { ControllerInputType } from "../types/controllerTypes"
import { ControllerOutputType } from "../types/controllerTypes"
import exampleView from "../views/exampleView"

export async function exampleController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return exampleView({})
}

export default exampleController
