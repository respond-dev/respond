import {
  RouterInputType,
  RoutesType,
} from "../../framework/types/routerTypes"

export async function routeSelector(
  input: RouterInputType,
  routes: RoutesType
): Promise<any[]> {
  const imports = await Promise.all(
    routes
      .filter(([matcher]) => {
        return input.url.pathname.match(matcher)
      })
      .map(([, name, layout]) => {
        const path = `../../app/controllers/${name}Controller`
        const layoutPath = `../../app/views/${layout}View`

        if (!input.client && layout) {
          return Promise.all([
            import(path + ""),
            import(layoutPath + ""),
          ])
        } else {
          return Promise.all([import(path + "")])
        }
      })
  )

  return await Promise.all(
    imports.map(
      async ([{ default: component }, layoutImport]) => {
        const output = await component(input)

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
