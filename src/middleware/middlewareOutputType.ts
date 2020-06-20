export interface MiddlewareOutputType {
  cookies?: Record<string, string>
  query?: Record<string, string | string[]>
}

export default MiddlewareOutputType
