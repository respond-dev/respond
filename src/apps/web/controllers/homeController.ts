import { ControllerInputType } from "types/controllerTypes"
import { ControllerOutputType } from "types/controllerTypes"
import homeView from "../views/homeView"

export async function controller(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return homeView(input)
}

export default controller
