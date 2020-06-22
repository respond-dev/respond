import { join } from "path"
import acceptTester from "./acceptTester"

export async function requester(
  ...args: any[]
): Promise<Record<string, any>> {
  const dirPath = join(__dirname, "../initializers")
  const instances = await acceptTester(dirPath, ...args)

  const responses = await Promise.all(
    instances.map(
      async (instance) => await instance.respond(...args)
    )
  )

  return Object.assign({}, ...responses)
}

export default requester
