import MiddlewareInputType from "../middleware/middlewareInputType"
import MiddlewareOutputType from "../middleware/middlewareOutputType"

export type ComponentInputType = MiddlewareInputType &
  MiddlewareOutputType

export default ComponentInputType
