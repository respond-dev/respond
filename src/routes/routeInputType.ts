import MiddlewareInputType from "../middleware/middlewareInputType"
import MiddlewareOutputType from "../middleware/middlewareOutputType"

export type RouteInputType = MiddlewareInputType &
  MiddlewareOutputType

export default RouteInputType
