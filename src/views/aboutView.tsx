import { ViewInputType } from "../types/respond/viewTypes"
import { ViewOutputType } from "../types/respond/viewTypes"
import { ServerAboutModelOutput } from "../models/serverAboutModel"

export interface AboutViewInputType {
  aboutModelOutput: ServerAboutModelOutput
}

export function aboutView(
  input: ViewInputType & AboutViewInputType,
  id = "about"
): ViewOutputType {
  return (
    <div id={id}>
      <h1>
        <a href="/about">About</a>
      </h1>
      <a href="/">Home</a>
      <br />
      Rendered on{" "}
      {typeof history !== "undefined" ? "client" : "server"}
      .
    </div>
  )
}

export default aboutView
