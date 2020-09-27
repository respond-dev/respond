import { ControllerInputType } from "types/controllerTypes"
import { ControllerOutputType } from "types/controllerTypes"

export async function testController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  if (input.query.returnJson) {
    return JSON.stringify({ path: input.url.path })
  }

  return <div>{input.url.path}</div>
}

export default testController
