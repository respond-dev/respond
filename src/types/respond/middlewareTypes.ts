import elementBuilder from "libs/respond/elementBuilder"
import styleInjector from "libs/respond/styleInjector"
import { InitializerInputType } from "./initializerTypes"
import { InitializerOutputType } from "./initializerTypes"
import { SettlerOutputType } from "./settlerTypes"

export type MiddlewareInputType = InitializerInputType &
  InitializerOutputType

export type MiddlewareOutputType = SettlerOutputType & {
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
