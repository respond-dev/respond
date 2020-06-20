import MiddlewareOutputType from "../middleware/middlewareOutputType"
import RequesterInputType from "../requesters/requesterInputType"
import RequesterOutputType from "../requesters/requesterOutputType"

export type RouterInputType = RequesterInputType &
  RequesterOutputType &
  MiddlewareOutputType

export default RouterInputType
