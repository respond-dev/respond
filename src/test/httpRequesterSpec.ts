import { IncomingMessage, IncomingHttpHeaders } from "http"
import net from "net"
import URL from "url"
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
  it("GET empty", async () => {
    const headers = { host: "localhost" }
    expect(
      await httpRequester.respond({
        httpIncomingMessage: new FakeIncomingMessage(
          "GET",
          "/",
          headers
        ),
      })
    ).toEqual({
      headers,
      method: "GET",
      url: URL.parse("http://localhost"),
    })
  })
})
