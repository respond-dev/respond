import URL from "url"
import expect from "libs/specs/expect"
import { ConstructorInputType } from "types/respond/constructorTypes"
import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import { DomDocument } from "libs/respond/domBuilder"
import pipeline from "./pipeline"
import pipelinePaths from "./pipelinePaths"

describe("pipeline", () => {
  it("handles empty input", async () => {
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
      doc: expect.any(DomDocument),
      el: expect.any(Function),
      form: { params: {}, files: {} },
      query: {},
      respond: {
        httpCode: 404,
      },
    })
  })

  it("executes test pipeline (element)", async () => {
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
      doc: expect.any(DomDocument),
      el: expect.any(Function),
      form: { params: {}, files: {} },
      headers: { host: "test.com" },
      method: "GET",
      query: {},
      respond: {
        mimeType: "text/html",
        output: "<div>/</div>",
      },
      testRequest: {
        headers: { host: "test.com" },
        httpMethod: "GET",
        path: "/",
      },
      url: URL.parse("http://test.com/"),
    })
  })

  it("executes test pipeline (JSON)", async () => {
    const paths = await pipelinePaths("respond-test")

    const output = await pipeline<
      ConstructorInputType,
      SettlerInputType & SettlerOutputType
    >("respond-test", {
      input: {
        testRequest: {
          headers: { host: "test.com" },
          httpMethod: "GET",
          path: "/?returnJson=1",
        },
      },
      paths,
    })

    expect(output).toEqual({
      constructed: true,
      cookies: {},
      css: expect.any(Function),
      doc: expect.any(DomDocument),
      el: expect.any(Function),
      form: { params: {}, files: {} },
      headers: { host: "test.com" },
      method: "GET",
      query: { returnJson: "1" },
      respond: { output: '{"path":"/?returnJson=1"}' },
      testRequest: {
        headers: { host: "test.com" },
        httpMethod: "GET",
        path: "/?returnJson=1",
      },
      url: URL.parse("http://test.com/?returnJson=1"),
    })
  })

  it("retrieves assets", async () => {
    const paths = await pipelinePaths("respond")

    const output = await pipeline<
      ConstructorInputType,
      SettlerInputType & SettlerOutputType
    >("respond", {
      input: {
        testRequest: {
          headers: { host: "test.com" },
          httpMethod: "GET",
          path: "/dist/esm/libs/pipelines/pipeline.mjs",
        },
      },
      paths,
    })

    expect(output).toEqual({
      constructed: true,
      form: { params: {}, files: {} },
      headers: { host: "test.com" },
      method: "GET",
      query: {},
      respond: {
        binary: false,
        mimeType: "application/javascript",
        output: expect.any(String),
      },
      testRequest: {
        headers: { host: "test.com" },
        httpMethod: "GET",
        path: "/dist/esm/libs/pipelines/pipeline.mjs",
      },
      url: URL.parse(
        "http://test.com/dist/esm/libs/pipelines/pipeline.mjs"
      ),
    })
  })
})
