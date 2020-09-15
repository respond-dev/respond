import { join } from "path"
import yamlLoader from "./yaml/yamlLoader"

export interface EnvYamlType {
  envVars: Record<string, string>
  pipelines: Record<string, string[]>
  s3Bucket: string
  ssmKey: string
}

export type AppYamlType = EnvYamlType & {
  name: string
  dev: EnvYamlType
  stage: EnvYamlType
  prod: EnvYamlType
}

export async function appYamlLoader(): Promise<
  AppYamlType
> {
  return await yamlLoader(
    join(__dirname, "root/config/app.yml")
  )
}

export default appYamlLoader
