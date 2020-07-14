import { UrlWithStringQuery } from "url"
import {
  ConstructorInputType,
  ConstructorOutputType,
} from "./constructorTypes"

export type InitializerInputType = ConstructorInputType &
  ConstructorOutputType

export interface InitializerOutputType {
  headers?: Record<string, string>
  method?: string
  output?: (Element | string)[] | Element | string
  url?: UrlWithStringQuery
}
