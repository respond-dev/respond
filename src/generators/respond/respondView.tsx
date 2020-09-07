import { ViewInputType } from "../../types/respond/viewTypes"
import { ViewOutputType } from "../../types/respond/viewTypes"

export interface RespondViewInputType {}

export function respondView(
  input: ViewInputType & RespondViewInputType,
  id = "respond"
): ViewOutputType {
  return (
    <div id={id}>
      <h1>
        <a href="/respond">Respond</a>
      </h1>
      Rendered on{" "}
      {typeof history !== "undefined" ? "client" : "server"}
      .
    </div>
  )
}

export default respondView
