import expect from "../lib/expect"
import ptySpawn from "../lib/ptySpawn"

describe("ptySpawn", () => {
  it("spawns a pseudoterminal", async () => {
    const { code, out, signal } = await ptySpawn("ls")
    expect(code).toBe(0)
    expect(signal).toBe(0)
    expect(out).toEqual(expect.any(String))
  })
})
