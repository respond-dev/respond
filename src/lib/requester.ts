import { join } from "path"
import responder from "./responder"
import IntializerInputType from "../initializers/initializerInputType"

export async function requester(
  input: IntializerInputType
): Promise<Record<string, any>> {
  const responses = await responder(
    join(__dirname, "../initializers"),
    input
  )
  return responses
}

export default requester
