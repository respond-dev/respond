export interface RequesterOutputType {
  cookies: Record<string, string>
  files: Record<
    string,
    { name: string; path: string; mimetype: string }
  >
  headers: Record<string, string>
  method: string
  params: Record<string, any>
  path: string
}

export default RequesterOutputType
