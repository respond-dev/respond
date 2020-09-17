import { ControllerInputType } from "types/respond/controllerTypes"
import { ControllerOutputType } from "types/respond/controllerTypes"
import respondView from "./respondView"

export async function respondController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return respondView(input)
}

export default respondController
