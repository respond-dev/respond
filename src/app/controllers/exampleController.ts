import {
  ControllerInputType,
  ControllerOutputType,
} from "../types/controllerTypes"

// inject imports here
import exampleView from "../views/exampleView"

export async function exampleController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return exampleView({})
}

export default exampleController
