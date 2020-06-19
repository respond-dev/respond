import { APIGatewayProxyEvent } from "aws-lambda"
import expect from "../lib/expect"
import lambdaRequester from "../requesters/lambdaRequester"

class FakeGatewayProxyEvent {
  constructor(
    public httpMethod: string,
    public path: string,
    public body: string,
    public headers: Record<string, string> = {},
    public isBase64Encoded = false
  ) {}
}

describe("lambdaRequester", () => {
  it("GET / empty", async () => {
    const proxyEvent = new FakeGatewayProxyEvent(
      "GET",
      "/",
      ""
    )
    expect(
      await lambdaRequester.respond({
        apiGatewayProxyEvent: (proxyEvent as unknown) as APIGatewayProxyEvent,
      })
    ).toEqual({
      files: {},
      headers: {},
      method: "GET",
      params: {},
      path: "/",
    })
  })

  it("GET / urlencoded", async () => {
    const proxyEvent = new FakeGatewayProxyEvent(
      "GET",
      "/?foo=bar&baz=bla",
      ""
    )
    expect(
      await lambdaRequester.respond({
        apiGatewayProxyEvent: (proxyEvent as unknown) as APIGatewayProxyEvent,
      })
    ).toEqual({
      files: {},
      headers: {},
      method: "GET",
      params: {
        baz: "bla",
        foo: "bar",
      },
      path: "/",
    })
  })

  it("POST / JSON", async () => {
    const headers = {
      "content-type": "application/json",
    }

    const proxyEvent = new FakeGatewayProxyEvent(
      "POST",
      "/",
      '{ "foo": "bar", "baz": "bla" }',
      headers
    )

    const promise = lambdaRequester.respond({
      apiGatewayProxyEvent: (proxyEvent as unknown) as APIGatewayProxyEvent,
    })

    expect(await promise).toEqual({
      files: {},
      headers,
      method: "POST",
      params: {
        baz: "bla",
        foo: "bar",
      },
      path: "/",
    })
  })

  it("POST / urlencoded", async () => {
    const headers = {
      "content-type":
        "application/x-www-form-urlencoded; charset=utf-8",
    }

    const proxyEvent = new FakeGatewayProxyEvent(
      "POST",
      "/",
      "foo=bar&baz=bla",
      headers
    )

    const promise = lambdaRequester.respond({
      apiGatewayProxyEvent: (proxyEvent as unknown) as APIGatewayProxyEvent,
    })

    expect(await promise).toEqual({
      files: {},
      headers,
      method: "POST",
      params: {
        baz: "bla",
        foo: "bar",
      },
      path: "/",
    })
  })

  it("POST / multipart", async () => {
    const headers = {
      "content-type":
        "multipart/form-data; boundary=" +
        "---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
    }

    const proxyEvent = new FakeGatewayProxyEvent(
      "POST",
      "/",
      [
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="fileName0"',
        "",
        "super a file",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="fileName1"',
        "",
        "super b file",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="uploadFile0"; filename="1k_a.dat"',
        "Content-Type: application/octet-stream",
        "",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="uploadFile1"; filename="1k_b.dat"',
        "Content-Type: application/octet-stream",
        "",
        "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--",
      ].join("\r\n"),
      headers
    )

    const promise = lambdaRequester.respond({
      apiGatewayProxyEvent: (proxyEvent as unknown) as APIGatewayProxyEvent,
    })

    expect(await promise).toEqual({
      files: {
        uploadFile0: {
          encoding: "7bit",
          mimetype: "application/octet-stream",
          name: "1k_a.dat",
          path: expect.any(String),
        },
        uploadFile1: {
          encoding: "7bit",
          mimetype: "application/octet-stream",
          name: "1k_b.dat",
          path: expect.any(String),
        },
      },
      headers,
      method: "POST",
      params: {
        fileName0: "super a file",
        fileName1: "super b file",
      },
      path: "/",
    })
  })
})
