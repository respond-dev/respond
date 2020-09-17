import { UrlWithStringQuery } from "url"
import { ConstructorInputType } from "./constructorTypes"
import { ConstructorOutputType } from "./constructorTypes"

export type InitializerInputType = ConstructorInputType &
  ConstructorOutputType

export interface InitializerOutputType {
  headers?: Record<string, string>
  method?: string
  output?: (Element | string)[] | Element | string
  url?: UrlWithStringQuery
}
