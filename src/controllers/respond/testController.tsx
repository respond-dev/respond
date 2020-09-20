import { ControllerInputType } from "types/controllerTypes"
import { ControllerOutputType } from "types/controllerTypes"

export async function testController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  return <div>{input.url.path}</div>
}

export default testController
