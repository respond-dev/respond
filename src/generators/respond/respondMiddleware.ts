import { MiddlewareInputType } from "../../lib/respond/types/middlewareTypes"
import { MiddlewareOutputType } from "../../lib/respond/types/middlewareTypes"

export async function respondMiddleware(
  input: MiddlewareInputType
): Promise<MiddlewareOutputType> {
  return {}
}

export default respondMiddleware
