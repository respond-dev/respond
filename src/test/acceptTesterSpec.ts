import expect from "../lib/expect"
import acceptTester from "../lib/acceptTester"
import { TestInitializer } from "../initializers/testInitializer"
import { join } from "path"

describe("acceptTester", () => {
  it("tests acceptance", async () => {
    const testInitializer = await acceptTester(
      join(__dirname, "../initializers"),
      { test: true }
    )
    expect(testInitializer.length).toBe(1)
    expect(testInitializer[0]).toBeInstanceOf(
      TestInitializer
    )
  })
})
