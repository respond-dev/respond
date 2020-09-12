import domBuilder from "pipelines/respond/lib/domBuilder"

export async function serverDomConstructor(): Promise<
  void
> {
  global["document"] = domBuilder() as any
}

export default serverDomConstructor
