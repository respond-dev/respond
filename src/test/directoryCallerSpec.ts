import expect from "../lib/expect"
import directoryCaller from "../lib/directoryCaller"
import { join } from "path"

describe("directoryCaller", () => {
  it("tests acceptance", async () => {
    const testInitializer = await directoryCaller(
      join(__dirname, "../initializers"),
      { test: true }
    )
    expect(testInitializer.length).toBe(1)
    expect(testInitializer[0]).toEqual(true)
  })
})
