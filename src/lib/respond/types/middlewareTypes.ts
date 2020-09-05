import { InitializerInputType } from "./initializerTypes"
import { InitializerOutputType } from "./initializerTypes"
import elementBuilder from "../lib/elementBuilder"
import styleInjector from "../lib/styleInjector"

export type MiddlewareInputType = InitializerInputType &
  InitializerOutputType

export interface MiddlewareOutputType {
  cookies?: Record<string, string>
  css?: typeof styleInjector
  doc?: Document
  el?: typeof elementBuilder
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
