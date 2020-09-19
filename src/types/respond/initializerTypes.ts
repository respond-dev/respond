import { UrlWithStringQuery } from "url"
import { ConstructorInputType } from "./constructorTypes"
import { ConstructorOutputType } from "./constructorTypes"
import { SettlerOutputType } from "./settlerTypes"

export type InitializerInputType = ConstructorInputType &
  ConstructorOutputType

export type InitializerOutputType = SettlerOutputType & {
  headers?: Record<string, string>
  method?: string
  url?: UrlWithStringQuery
}
