import RequesterInputType from "../requesters/requesterInputType"
import RequesterOutputType from "../requesters/requesterOutputType"

export type MiddlewareInputType = RequesterInputType &
  RequesterOutputType

export default MiddlewareInputType
