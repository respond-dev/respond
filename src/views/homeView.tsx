import ViewOutputType from "./viewOutputType"

export interface HomeViewInputType {}

export function homeView(
  input: HomeViewInputType,
  id = "home"
): ViewOutputType {
  return <div id={id}></div>
}

export default homeView
