import { spawn, IPty } from "node-pty"

export interface PtySpawnerOutput {
  code: number
  out: string
  signal: number
}

export interface PtySpawnerOptions {
  args?: string[]
  cwd?: string
  env?: Record<string, string>
  stdout?: boolean
}

export async function ptySpawnerRaw(
  command: string,
  options: PtySpawnerOptions = {}
): Promise<[IPty, Promise<PtySpawnerOutput>]> {
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
  }) as Promise<PtySpawnerOutput>

  return [pty, promise]
}

export async function ptySpawner(
  command: string,
  options: PtySpawnerOptions = {}
): Promise<PtySpawnerOutput> {
  const [, promise] = await ptySpawnerRaw(command, options)
  return await promise
}

export default ptySpawner
