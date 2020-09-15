import { pathExists, readFile } from "fs-extra"
import { isAbsolute, join } from "path"
import YAML from "yaml"

const cache: Record<string, any> = {}

export async function yamlLoader(
  yamlPath: string
): Promise<any> {
  yamlPath = absolutePath(yamlPath)

  if (await pathExists(yamlPath)) {
    return YAML.parse(
      (await readFile(yamlPath)).toString(),
      { merge: true }
    )
  }
}

export async function cachedYamlLoader(
  yamlPath: string
): Promise<any> {
  yamlPath = absolutePath(yamlPath)

  if (cache[yamlPath]) {
    return cache[yamlPath]
  } else {
    return (cache[yamlPath] = await yamlLoader(yamlPath))
  }
}

function absolutePath(yamlPath: string): string {
  if (isAbsolute(yamlPath)) {
    return yamlPath
  } else {
    return join(__dirname, "root/", yamlPath)
  }
}

export default cachedYamlLoader
