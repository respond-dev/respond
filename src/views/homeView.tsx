import { ViewInputType } from "../types/respond/viewTypes"
import { ViewOutputType } from "../types/respond/viewTypes"
import { HomeModelOutput } from "../models/homeModel"

export interface HomeViewInputType {
  homeModelOutput: HomeModelOutput
}

export function homeView(
  input: ViewInputType & HomeViewInputType,
  id = "home"
): ViewOutputType {
  return (
    <div id={id}>
      <h1>
        <a href="/">Home</a>
      </h1>
      <a href="/about">About</a>
      <br />
      Rendered on{" "}
      {typeof history !== "undefined" ? "client" : "server"}
      .
    </div>
  )
}

export default homeView
