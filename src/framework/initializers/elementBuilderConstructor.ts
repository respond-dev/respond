import { ConstructorInputType } from "../types/constructorTypes"
import { ConstructorOutputType } from "../types/constructorTypes"
import elementBuilder from "../lib/elementBuilder"
import domBuilder from "../lib/domBuilder"

export async function elementBuilderConstructor({
  client,
}: ConstructorInputType): Promise<ConstructorOutputType> {
  let doc: Document
  let win: Window

  if (client) {
    doc = document
    win = window
  } else {
    win = {} as Window
    doc = (domBuilder() as unknown) as Document
  }

  return {
    elementBuilder: elementBuilder.bind(doc),
    doc,
    win,
  }
}

export default elementBuilderConstructor
