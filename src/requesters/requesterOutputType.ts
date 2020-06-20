export interface RequesterOutputType {
  files: Record<
    string,
    { name: string; path: string; mimetype: string }
  >
  // hash: string
  headers: Record<string, string>
  // host: string
  // https: boolean
  method: string
  path: string
  params: Record<string, string | string[]>
  // port: number
  querystring: string
}

export default RequesterOutputType
