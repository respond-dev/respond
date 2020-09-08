import { ReplacementInputType } from "../types/replacementTypes"

export function routeReplacements({
  name,
  generators,
  replacements,
  routePath,
}: ReplacementInputType): void {
  const hasView = generators.includes("view")

  replacements.push([
    "remoteModelRoute",
    `remoteModelRoute,\n    { matcher: "${routePath}", controller: "${name}"${
      hasView ? ', layoutView: "layout"' : ""
    } },`,
    (body) => !body.includes(`{ matcher: "${routePath}"`),
  ])
}

export default routeReplacements
