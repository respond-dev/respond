import { IncomingMessage, IncomingHttpHeaders } from "http"
import net from "net"
import URL from "url"
import expect from "libs/expect/expect"
import serverHttpInitializer from "./serverHttpInitializer"

class FakeIncomingMessage extends IncomingMessage {
  constructor(
    public method: string,
    public url: string,
    public headers: IncomingHttpHeaders = {}
  ) {
    super(({} as unknown) as net.Socket)
  }
}

describe("httpServerInitializer", () => {
  it("GET empty", async () => {
    const headers = { host: "localhost" }
    expect(
      await serverHttpInitializer({
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
