import { ViewInputType } from "types/web-app/viewTypes"
import { ViewOutputType } from "types/web-app/viewTypes"
import { ModelOutput } from "../models/homeModel"

export function homeView(
  input: ViewInputType & { homeModelOutput: ModelOutput },
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

export default homeView
