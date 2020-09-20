import { ControllerInputType } from "types/controllerTypes"
import { ControllerOutputType } from "types/controllerTypes"

export async function testController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return JSON.stringify(input.url)
}

export default testController
