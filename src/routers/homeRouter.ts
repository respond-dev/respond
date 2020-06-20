import RouterInputType from "./routerInputType"
import RouterOutputType from "./routerOutputType"

export class HomeRouter {
  accept({ path }: RouterInputType): boolean {
    return path === "/"
  }

  respond(input: RouterInputType): RouterOutputType {
    return {}
  }
}

export const homeRouter = new HomeRouter()
export default homeRouter
