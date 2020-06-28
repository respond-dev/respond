import { DomDocument } from "../lib/domBuilder"

export interface MiddlewareOutputType {
  cookies?: Record<string, string>
  dom?: DomDocument
  form?: {
    files?: Record<
      string,
      { name: string; path: string; mimetype: string }
    >
    params: Record<string, string | string[]>
  }
  hash?: string
  json?: any
  query?: Record<string, string | string[]>
}

export default MiddlewareOutputType
