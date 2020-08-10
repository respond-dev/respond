export type ReplacementConditionType = (
  body: string
) => boolean

export interface ReplacementInputType {
  name: string
  generators: string[]
  modelName: string
  upperModelName: string
  replacements: ReplacementOutputType
  routePath: string
}

export type ReplacementOutputType = [
  string | RegExp,
  string,
  ReplacementConditionType?
][]
