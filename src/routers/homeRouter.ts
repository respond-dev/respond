import RouterInputType from "./routerInputType"
import RouterOutputType from "./routerOutputType"

export class HomeRouter {
  accept({ url }: RouterInputType): boolean {
    return url.pathname === "/"
  }

  async respond(): Promise<RouterOutputType> {
    return {
      controllers: ["homeController"],
      views: ["homeView"],
    }
  }
}

export const homeRouter = new HomeRouter()
export default homeRouter
