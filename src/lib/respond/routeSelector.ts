import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export interface RouteType {
  matcher: string | RegExp
  controller: string
  layoutView?: string
  extraInput?: Record<string, any>
}

export async function routeSelector(
  input: RouterInputType,
  routes: RouteType[]
): Promise<RouterOutputType> {
  const controllersPath = "controllers/"
  const viewsPath = "views/"

  const routeMatch = routes.find(({ matcher }) => {
    if (typeof matcher === "string") {
      return input.url.pathname === matcher
    } else {
      return input.url.pathname.match(matcher)
    }
  })

  let output: any

  if (routeMatch) {
    const {
      controller,
      layoutView,
      extraInput,
    } = routeMatch

    const path = `${controllersPath}${controller}Controller`

    let route: [any, any]

    if (!input.client && layoutView) {
      const layoutPath = `${viewsPath}${layoutView}View`

      route = await Promise.all([
        import(path + ""),
        import(layoutPath + ""),
      ])
    } else {
      route = await Promise.all([import(path + ""), null])
    }

    const [{ default: component }, layoutImport] = route

    output = await component({
      ...input,
      ...extraInput,
    })

    if (layoutImport) {
      output = layoutImport.default({
        ...input,
        body: output,
      })
    }

    return {
      respond: { output },
    }
  }

  if (output === undefined) {
    return {
      respond: {
        httpCode: 404,
        output,
      },
    }
  }
}

export default routeSelector
