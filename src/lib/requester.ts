import { join } from "path"
import responder from "./responder"
import RequesterInputType from "../requesters/requesterInputType"

export async function requester(
  input: RequesterInputType
): Promise<Record<string, any>> {
  const responses = await responder(
    join(__dirname, "../requesters"),
    input
  )
  return responses
}

export default requester
