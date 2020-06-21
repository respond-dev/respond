import { UrlWithStringQuery } from "url"

export interface RequesterOutputType {
  headers: Record<string, string>
  method: string
  url: UrlWithStringQuery
}

export default RequesterOutputType
