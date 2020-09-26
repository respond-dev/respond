import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export interface RouteType {
  matcher: string | RegExp
  controller: string
  layout?: string
  input?: Record<string, any>
}

export async function routeSelector(
  relAppDir: string,
  input: RouterInputType,
  routes: RouteType[]
): Promise<RouterOutputType> {
  const baseDir =
    typeof history === "undefined" ? "dist/cjs" : "dist/esm"

  const appDir =
    relAppDir.split(/\/(cjs|esm)\//)[2] || relAppDir

  const controllersPath = `${baseDir}/${appDir}/controllers/`
  const viewsPath = `${baseDir}/${appDir}/views/`

  if (!input?.url) {
    return
  }

  const routeMatch = routes.find(({ matcher }) => {
    if (typeof matcher === "string") {
      return input.url.pathname === matcher
    } else {
      return input.url.pathname.match(matcher)
    }
  })

  let output: any

  if (routeMatch) {
    const { controller, layout, input: extra } = routeMatch
    const path = `${controllersPath}${controller}Controller`

    let route: [any, any]

    if (!input.client && layout) {
      const layoutPath = `${viewsPath}${layout}View`

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
      ...extra,
    })

    if (layoutImport) {
      output = await layoutImport.default({
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
