import { ViewOutputType } from "../types/viewTypes"

export interface HomeViewInputType {}

export function homeView(
  input: HomeViewInputType,
  id = "home"
): ViewOutputType {
  const client = typeof history !== "undefined"
  return <div id={id}>{client ? "client" : "server"}</div>
}

export default homeView
