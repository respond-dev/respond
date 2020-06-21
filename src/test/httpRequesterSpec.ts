import { IncomingMessage, IncomingHttpHeaders } from "http"
import net from "net"
import URL from "url"
import expect from "../lib/expect"
import httpInitializer from "../initializers/httpInitializer"

class FakeIncomingMessage extends IncomingMessage {
  constructor(
    public method: string,
    public url: string,
    public headers: IncomingHttpHeaders = {}
  ) {
    super(({} as unknown) as net.Socket)
  }
}

describe("httpInitializer", () => {
  it("GET empty", async () => {
    const headers = { host: "localhost" }
    expect(
      await httpInitializer.respond({
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
