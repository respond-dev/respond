import { ControllerInputType } from "../../lib/respond/types/controllerTypes"
import { ControllerOutputType } from "../../lib/respond/types/controllerTypes"
import exampleView from "../views/exampleView"

export async function exampleController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return exampleView(input)
}

export default exampleController
