import expect from "../../lib/expect"
import ptySpawner from "../lib/ptySpawner"

describe("ptySpawner", () => {
  it("spawns a pseudoterminal", async () => {
    const { code, out, signal } = await ptySpawner("ls")
    expect(code).toBe(0)
    expect(signal).toBe(0)
    expect(out).toEqual(expect.any(String))
  })
})
