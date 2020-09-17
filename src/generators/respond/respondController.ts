import { ControllerInputType } from "types/controllerTypes"
import { ControllerOutputType } from "types/controllerTypes"
import respondView from "./respondView"

export async function respondController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return respondView(input)
}

export default respondController
