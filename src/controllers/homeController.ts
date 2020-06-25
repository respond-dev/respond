import ControllerInputType from "./controllerInputType"
import ControllerOutputType from "./controllerOutputType"

export class HomeController {
  respond(
    input: ControllerInputType
  ): ControllerOutputType {
    return {}
  }
}

export const homeController = new HomeController()
export default homeController
