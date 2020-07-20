import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "../framework/types/middlewareTypes"

export async function exampleMiddleware(
  input: MiddlewareInputType
): Promise<MiddlewareOutputType> {
  return {}
}

export default exampleMiddleware
