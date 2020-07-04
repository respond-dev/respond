import {
  InitializerInputType,
  InitializerOutputType,
} from "./initializerTypes"

export type MiddlewareInputType = InitializerInputType &
  InitializerOutputType

export interface MiddlewareOutputType {
  cookies?: Record<string, string>
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
