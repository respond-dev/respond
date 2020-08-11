import { MiddlewareInputType } from "../../framework/types/middlewareTypes"
import { MiddlewareOutputType } from "../../framework/types/middlewareTypes"

export async function exampleMiddleware(
  input: MiddlewareInputType
): Promise<MiddlewareOutputType> {
  return {}
}

export default exampleMiddleware
