import { MiddlewareInputType } from "../types/middlewareTypes"
import { MiddlewareOutputType } from "../types/middlewareTypes"
import assetMatcher from "../lib/assetMatcher"
import elementBuilder from "../lib/elementBuilder"

export async function elementBuilderConstructor({
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
    const { domBuilder } = await import("../lib/domBuilder")
    doc = (domBuilder() as unknown) as Document
  }

  return {
    elementBuilder: elementBuilder.bind(doc),
    doc,
  }
}

export default elementBuilderConstructor
