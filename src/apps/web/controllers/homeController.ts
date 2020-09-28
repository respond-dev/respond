import { ControllerInputType } from "types/web-app/controllerTypes"
import { ControllerOutputType } from "types/web-app/controllerTypes"
import homeView from "../views/homeView"

export async function controller(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return homeView(input)
}

export default controller
