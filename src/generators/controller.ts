import { ControllerInputType } from "types/controllerTypes"
import { ControllerOutputType } from "types/controllerTypes"
import view from "./view"

export async function controller(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return view(input)
}

export default controller
