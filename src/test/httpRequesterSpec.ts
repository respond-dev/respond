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
  it("GET empty", async () => {
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

  it("POST JSON", async () => {
    const headers = {
      "content-type": "application/json",
    }

    const httpIncomingMessage = new FakeIncomingMessage(
      "POST",
      "/",
      headers
    )

    const promise = httpRequester.respond({
      httpIncomingMessage,
    })

    httpIncomingMessage.emit(
      "data",
      '{ "foo": "bar", "baz": "bla" }'
    )
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

  it("POST urlencoded", async () => {
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

  it("POST multipart", async () => {
    const headers = {
      "content-type":
        "multipart/form-data; boundary=" +
        "---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
    }

    const httpIncomingMessage = new FakeIncomingMessage(
      "POST",
      "/",
      headers
    )

    const promise = httpRequester.respond({
      httpIncomingMessage,
    })

    httpIncomingMessage.emit(
      "data",
      [
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="fileName0"',
        "",
        "a file",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="fileName1"',
        "",
        "b file",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="uploadFile0"; filename="a.dat"',
        "Content-Type: application/octet-stream",
        "",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="uploadFile1"; filename="b.dat"',
        "Content-Type: application/octet-stream",
        "",
        "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--",
      ].join("\r\n")
    )
    httpIncomingMessage.emit("end")

    expect(await promise).toEqual({
      files: {
        uploadFile0: {
          encoding: "7bit",
          mimetype: "application/octet-stream",
          name: "a.dat",
          path: expect.any(String),
        },
        uploadFile1: {
          encoding: "7bit",
          mimetype: "application/octet-stream",
          name: "b.dat",
          path: expect.any(String),
        },
      },
      headers,
      method: "POST",
      params: {
        fileName0: "a file",
        fileName1: "b file",
      },
      path: "/",
    })
  })
})
