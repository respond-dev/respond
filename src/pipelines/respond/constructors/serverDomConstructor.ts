import domBuilder from "lib/respond/domBuilder"

export async function serverDomConstructor(): Promise<
  void
> {
  global["document"] = domBuilder() as any
}

export default serverDomConstructor
