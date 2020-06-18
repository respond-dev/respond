import { Stream } from "stream"

export async function streamStringifier(
  stream: Stream
): Promise<string> {
  let data = ""

  stream.on("data", (chunk) => {
    data += chunk
  })

  const finished = new Promise((resolve) => {
    stream.on("end", async () => {
      resolve(data)
    })
  }) as Promise<string>

  return await finished
}

export default streamStringifier
