import { join } from "path"
import yamlLoader from "libs/yamlLoader/yamlLoader"

export interface EnvYamlType {
  envVars: Record<string, string>
  pipelines: Record<string, string[]>
  s3Bucket: string
  ssmKey: string
}

export type ProjectYamlType = EnvYamlType & {
  name: string
  dev: EnvYamlType
  stage: EnvYamlType
  prod: EnvYamlType
}

export async function projectYamlLoader(): Promise<
  ProjectYamlType
> {
  return await yamlLoader(
    join(__dirname, "root/config/project.yml")
  )
}

export default projectYamlLoader
