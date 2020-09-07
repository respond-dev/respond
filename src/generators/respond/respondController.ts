import { ControllerInputType } from "../../lib/respond/types/controllerTypes"
import { ControllerOutputType } from "../../lib/respond/types/controllerTypes"
import respondView from "../views/respondView"

export async function respondController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return respondView(input)
}

export default respondController
