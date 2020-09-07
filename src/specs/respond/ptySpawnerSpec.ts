import expect from "../../lib/respond/expect"
import ptySpawner from "../../lib/respond/ptySpawner"

describe("ptySpawner", () => {
  it("spawns a pseudoterminal", async () => {
    const { code, out, signal } = await ptySpawner("ls")
    expect(code).toBe(0)
    expect(signal).toBe(0)
    expect(out).toEqual(expect.any(String))
  })
})
