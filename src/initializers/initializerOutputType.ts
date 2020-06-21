import { UrlWithStringQuery } from "url"

export interface InitializerOutputType {
  headers: Record<string, string>
  method: string
  url: UrlWithStringQuery
}

export default InitializerOutputType
