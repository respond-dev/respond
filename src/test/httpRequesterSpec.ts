import { IncomingMessage, IncomingHttpHeaders } from "http"
import net from "net"
import expect from "../lib/expect"
import httpRequester from "../requesters/httpRequester"

class FakeIncomingMessage extends IncomingMessage {
  constructor(
    public method: string,
    public url: string,
    public headers: IncomingHttpHeaders = {}
  ) {
    super(({} as unknown) as net.Socket)
  }
}

describe("httpRequester", () => {
  it("GET / empty", async () => {
    expect(
      await httpRequester.respond({
        httpIncomingMessage: new FakeIncomingMessage(
          "GET",
          "/"
        ),
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
    expect(
      await httpRequester.respond({
        httpIncomingMessage: new FakeIncomingMessage(
          "GET",
          "/?foo=bar&baz=bla"
        ),
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

  it("POST / urlencoded", async () => {
    const headers = {
      "content-type":
        "application/x-www-form-urlencoded; charset=utf-8",
    }

    const httpIncomingMessage = new FakeIncomingMessage(
      "POST",
      "/",
      headers
    )

    const promise = httpRequester.respond({
      httpIncomingMessage,
    })

    httpIncomingMessage.emit("data", "foo=bar&baz=bla")
    httpIncomingMessage.emit("end")

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
})
