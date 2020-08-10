import { ReplacementInputType } from "../types/replacementTypes"

export function routeReplacements({
  name,
  generators,
  replacements,
  routePath,
}: ReplacementInputType): void {
  const hasView = generators.includes("view")

  const remoteRoute =
    '[/\\/remote\\/[^.]+.json/, "remoteCaller"],'

  replacements.push([
    remoteRoute,
    `${remoteRoute}\n    ["${routePath}", "${name}"${
      hasView ? ', "layout"' : ""
    }],`,
    (body) => !body.includes(`["${routePath}"`),
  ])
}

export default routeReplacements
