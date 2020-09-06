import { RouterInputType } from "../types/routerTypes"

export interface RouteType {
  matcher: string | RegExp
  controller: string
  layoutView?: string
  extraInput?: Record<string, any>
}

export type RoutesType = RouteType[]

export async function routeSelector(
  input: RouterInputType,
  routes: RoutesType
): Promise<any[]> {
  const imports = await Promise.all(
    routes
      .filter(({ matcher }) => {
        if (typeof matcher === "string") {
          return input.url.pathname === matcher
        } else {
          return input.url.pathname.match(matcher)
        }
      })
      .map(({ controller, layoutView, extraInput }) => {
        const path = `../../../${controller}Controller`
        const layoutPath = `../../../${layoutView}View`

        if (!input.client && layoutView) {
          return Promise.all([
            import(path + ""),
            import(layoutPath + ""),
            extraInput,
          ])
        } else {
          return Promise.all([
            import(path + ""),
            null,
            extraInput,
          ])
        }
      })
  )

  return await Promise.all(
    imports.map(
      async ([
        { default: component },
        layoutImport,
        extraInput,
      ]) => {
        const output = await component({
          ...input,
          ...extraInput,
        })

        if (layoutImport) {
          return layoutImport.default({ ...input, output })
        } else {
          return output
        }
      }
    )
  )
}

export default routeSelector
