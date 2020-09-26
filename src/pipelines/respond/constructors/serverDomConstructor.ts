import domBuilder from "libs/respond/domBuilder"

export async function serverDomConstructor(): Promise<
  void
> {
  global["document"] = domBuilder() as any
}

export default serverDomConstructor
