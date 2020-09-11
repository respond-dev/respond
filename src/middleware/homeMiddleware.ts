import { MiddlewareInputType } from "../types/respond/middlewareTypes"
import { MiddlewareOutputType } from "../types/respond/middlewareTypes"

export async function homeMiddleware(
  input: MiddlewareInputType
): Promise<MiddlewareOutputType> {
  return {}
}

export default homeMiddleware
