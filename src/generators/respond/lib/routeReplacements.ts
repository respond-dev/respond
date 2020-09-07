import { ReplacementInputType } from "../types/replacementTypes"

export function routeReplacements({
  name,
  generators,
  replacements,
  routePath,
}: ReplacementInputType): void {
  const hasView = generators.includes("view")

  const remoteModelRouteCall =
    'remoteModelRoute("app/models"),,'

  replacements.push([
    remoteModelRouteCall,
    `${remoteModelRouteCall}\n    ["${routePath}", "${name}"${
      hasView ? ', "layout"' : ""
    }],`,
    (body) => !body.includes(`["${routePath}"`),
  ])
}

export default routeReplacements
