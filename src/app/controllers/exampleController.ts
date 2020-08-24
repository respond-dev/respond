import { ControllerInputType } from "../../framework/types/controllerTypes"
import { ControllerOutputType } from "../../framework/types/controllerTypes"
import exampleView from "../views/exampleView"

export async function exampleController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return exampleView({})
}

export default exampleController
