import { MiddlewareInputType } from "pipelines/respond/types/middlewareTypes"
import { MiddlewareOutputType } from "pipelines/respond/types/middlewareTypes"
import extMatcher from "pipelines/respond/lib/extMatcher"
import elementBuilder from "pipelines/respond/lib/elementBuilder"
import styleInjector from "pipelines/respond/lib/styleInjector"

export async function domMiddleware({
  client,
  url,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  let doc: Document

  if (extMatcher(url.pathname)) {
    return
  }

  if (client) {
    doc = document
  } else {
    const { domBuilder } = await import(
      "pipelines/respond/lib/domBuilder"
    )
    doc = (domBuilder() as unknown) as Document
  }

  return {
    css: styleInjector.bind(doc),
    el: elementBuilder.bind(doc),
    doc,
  }
}

export default domMiddleware
