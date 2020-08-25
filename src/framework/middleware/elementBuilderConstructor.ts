import { MiddlewareInputType } from "../types/middlewareTypes"
import { MiddlewareOutputType } from "../types/middlewareTypes"
import { assetRegex } from "../lib/assetRequester"
import domBuilder from "../lib/domBuilder"
import elementBuilder from "../lib/elementBuilder"

export async function elementBuilderConstructor({
  client,
  url,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  let doc: Document

  if (url.pathname.match(assetRegex)) {
    return
  }

  if (client) {
    doc = document
  } else {
    doc = (domBuilder() as unknown) as Document
  }

  return {
    elementBuilder: elementBuilder.bind(doc),
    doc,
  }
}

export default elementBuilderConstructor
