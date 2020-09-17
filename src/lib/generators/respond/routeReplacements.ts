import { ReplacementInputType } from "lib/fs/fileCopier"

export function routeReplacements({
  name,
  generators,
  replacements,
  routePath,
}: ReplacementInputType): void {
  const hasView = generators.includes("view")

  replacements.push([
    "    remoteModelRoute",
    `    remoteModelRoute,
    {
      matcher: "${routePath}",
      controller: "${name}"${
      hasView ? ',\n      layoutView: "layout",' : ","
    }
    }`,
    (body) => !body.includes(`matcher: "${routePath}"`),
  ])
}

export default routeReplacements
