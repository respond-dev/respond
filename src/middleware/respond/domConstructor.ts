import { MiddlewareInputType } from "../../types/respond/middlewareTypes"
import { MiddlewareOutputType } from "../../types/respond/middlewareTypes"
import assetMatcher from "../../lib/respond/assetMatcher"
import elementBuilder from "../../lib/respond/elementBuilder"
import styleInjector from "../../lib/respond/styleInjector"

export async function domConstructor({
  client,
  url,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  let doc: Document

  if (assetMatcher(url.pathname)) {
    return
  }

  if (client) {
    doc = document
  } else {
    const { domBuilder } = await import(
      "../../lib/respond/domBuilder"
    )
    doc = (domBuilder() as unknown) as Document
  }

  return {
    css: styleInjector.bind(doc),
    el: elementBuilder.bind(doc),
    doc,
  }
}

export default domConstructor
