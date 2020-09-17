import { join } from "path"
import expect from "lib/specs/expect"
import importLoader from "./importLoader"

describe("importLoader", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importLoader(
      [
        join(
          __dirname,
          "pipelines/respond/initializers/testInitializer"
        ),
      ],
      { test: true }
    )
    expect(testInitializer).toEqual([{ testResult: true }])
  })
})
