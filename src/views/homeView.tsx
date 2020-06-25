import ViewInputType from "./viewInputType"
import ViewOutputType from "./viewOutputType"

export class HomeView {
  respond(input: ViewInputType): ViewOutputType {
    return <div></div>
  }
}

export const homeView = new HomeView()
export default homeView
