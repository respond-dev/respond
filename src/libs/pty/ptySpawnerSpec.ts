import expect from "libs/specs/expect"
import ptySpawner from "./ptySpawner"

describe("ptySpawner", () => {
  it("spawns a pseudoterminal", async () => {
    const { code, out, signal } = await ptySpawner("ls")
    expect(code).toBe(0)
    expect(signal).toBe(0)
    expect(out).toEqual(expect.any(String))
  })
})
