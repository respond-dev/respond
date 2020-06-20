import acceptTester from "./acceptTester"

export async function responder(
  dirPath: string,
  ...args: any[]
): Promise<Record<string, any>> {
  const instances = await acceptTester(dirPath, ...args)

  const responses = await Promise.all(
    instances.map(
      async (instance) => await instance.respond(...args)
    )
  )

  return Object.assign({}, ...responses)
}

export default responder
