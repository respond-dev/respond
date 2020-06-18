import { spawn, IPty } from "node-pty"

export interface PtySpawnOutput {
  code: number
  out: string
  signal: number
}

export interface PtySpawnOptions {
  args?: string[]
  cwd?: string
  env?: Record<string, string>
  stdout?: boolean
}

export async function ptySpawnRaw(
  command: string,
  options: PtySpawnOptions = {}
): Promise<[IPty, Promise<PtySpawnOutput>]> {
  const { args = [], cwd, env, stdout } = options

  const cols = process.stdout.columns
  const rows = process.stdout.rows

  const pty = spawn(command, args, {
    cols,
    cwd,
    env,
    name: "xterm-color",
    rows,
  })

  let out = ""

  pty.on("data", (data): void => {
    out += data

    if (stdout) {
      process.stdout.write(data)
    }
  })

  const promise = new Promise((resolve): void => {
    pty.on("exit", (code, signal): void =>
      resolve({ code, out, signal })
    )
  }) as Promise<PtySpawnOutput>

  return [pty, promise]
}

export async function ptySpawn(
  command: string,
  options: PtySpawnOptions = {}
): Promise<PtySpawnOutput> {
  const [, promise] = await ptySpawnRaw(command, options)
  return await promise
}

export default ptySpawn
