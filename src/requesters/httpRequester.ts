import querystring from "querystring"
import cookie from "cookie"
import { busboyBuilder } from "../lib/busboyBuilder"
import { headerCleaner } from "../lib/headerCleaner"
import streamStringifier from "../lib/streamStringifier"
import RequesterInputType from "./requesterInputType"
import RequesterOutputType from "./requesterOutputType"

export class HttpRequester {
  accept({
    httpIncomingMessage,
  }: RequesterInputType): boolean {
    return !!httpIncomingMessage
  }

  async respond({
    httpIncomingMessage: req,
  }: RequesterInputType): Promise<RequesterOutputType> {
    const [path, pathParams] = req.url.split("?")
    const headers = headerCleaner(req.headers)
    const cookies = headers.cookie
      ? cookie.parse(headers.cookie)
      : {}

    let params = {}
    let files = {}

    if (req.method === "GET" && pathParams) {
      params = querystring.parse(pathParams)
    }

    if (req.method === "POST") {
      if (headers["content-type"] === "application/json") {
        params = JSON.parse(await streamStringifier(req))
      } else {
        const [busboy, finished] = busboyBuilder(
          headers,
          files,
          params
        )

        req.pipe(busboy)
        ;({ files, params } = await finished)
      }
    }

    return {
      cookies,
      files,
      headers,
      method: req.method,
      params,
      path,
    }
  }
}

export const httpRequester = new HttpRequester()
export default httpRequester
