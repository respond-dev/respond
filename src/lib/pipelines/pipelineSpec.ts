import URL from "url"
import expect from "lib/specs/expect"
import { ConstructorInputType } from "types/respond/constructorTypes"
import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import { DomDocument } from "lib/respond/domBuilder"
import pipeline from "./pipeline"
import pipelinePaths from "./pipelinePaths"

describe("pipeline", () => {
  it("empty input", async () => {
    const paths = await pipelinePaths("respond")

    const output = await pipeline<
      ConstructorInputType,
      SettlerInputType & SettlerOutputType
    >("respond", {
      input: {},
      paths,
    })

    expect(output).toEqual({
      constructed: true,
      cookies: {},
      css: expect.any(Function),
      el: expect.any(Function),
      doc: expect.any(DomDocument),
      respond: {
        httpCode: 404,
      },
    })
  })

  it("test controller", async () => {
    const paths = await pipelinePaths("respond-test")

    const output = await pipeline<
      ConstructorInputType,
      SettlerInputType & SettlerOutputType
    >("respond-test", {
      input: {
        testRequest: {
          headers: { host: "test.com" },
          httpMethod: "GET",
          path: "/",
        },
      },
      paths,
    })

    expect(output).toEqual({
      constructed: true,
      cookies: {},
      css: expect.any(Function),
      el: expect.any(Function),
      doc: expect.any(DomDocument),
      headers: { host: "test.com" },
      method: "GET",
      respond: { output: expect.any(String) },
      testRequest: {
        headers: { host: "test.com" },
        httpMethod: "GET",
        path: "/",
      },
      url: URL.parse("http://test.com/"),
    })
  })
})
