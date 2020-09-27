import URL from "url"
import { join } from "path"
import expect from "libs/expect/expect"
import importLoader from "./importLoader"

describe("importLoader", () => {
  it("runs test initializer", async () => {
    const testInitializer = await importLoader(
      [
        join(
          __dirname,
          "pipelines/respond/initializers/serverTestInitializer"
        ),
      ],
      {
        testRequest: {
          headers: { host: "test.com" },
          httpMethod: "GET",
          path: "/",
        },
      }
    )
    expect(testInitializer).toEqual([
      {
        headers: { host: "test.com" },
        method: "GET",
        url: URL.parse("http://test.com/"),
      },
    ])
  })
})
